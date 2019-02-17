drop schema if exists jewce cascade;
create schema jewce;

-- History of all transactions at the day level
drop table if exists jewce.transactionHistory;
create table jewce.transactionHistory(
  id            bigserial   not null,
  date          date        not null,
  description   text        not null,
  val           numeric     not null,
  ptags         text[]      not null, 
  stags         text[]      not null, 
  shared        boolean     not null  default false,

  primary key(id)
);

-- Sets the initial balance starting point
drop table if exists jewce.initialBalance;
create table jewce.initialBalance(
  date  date    not null,
  val   numeric not null
);

-- Used to fiter-out costs in dashboard
drop table if exists jewce.costFilter;
create table jewce.costFilter(
  description   text    not null
);

-- Used to fiter-out income in dashboard
drop table if exists jewce.incomeFilter;
create table jewce.incomeFilter(
  description   text    not null
);


-- Total income+costs per month
drop view if exists jewce.monthTotal;
create view jewce.monthTotal as
  select 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date,
    sum(val) as val 
  from 
    jewce.transactionhistory 
  group by 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM');


-- Monthly balance (end of month view)
drop view if exists jewce.monthBalance;
create view jewce.monthBalance as
  with initialBalance as (
    select
      mt.date,
      mt.val as total,
      sum(mt.val) over (
        order by mt.date asc rows between unbounded preceding and current row 
      ) cumTotal,
      sb.val as initialBalance
    from 
      jewce.monthTotal mt
        cross join
      jewce.initialBalance sb 
  )

    select 
      date, 
      initialBalance + cumTotal as balance
    from 
      initialBalance;


-- Monthly savings (income - costs)
drop view if exists jewce.monthSavings;
create view jewce.monthSavings as
  with monthCostTotal as (
    select 
      to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date, 
      sum(val) as total
    from 
      jewce.transactionhistory 
    where 
      val < 0
      and description not in (select description from jewce.costFilter)
    group by 
      to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM')
  ),

  monthIncomeTotal as (
    select 
      to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date, 
      sum(val) as total 
    from 
      jewce.transactionhistory 
    where 
      val >= 0
      and description not in (select description from jewce.incomeFilter)
    group by 
      to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM')
  )

    select 
      i.date,
      i.total as income,
      c.total as costs,
      (i.total + c.total) as savings
    from 
      monthIncomeTotal i
        inner join 
      monthCostTotal c 
          on i.date = c.date 
    order by 
      date;


-- Monthly total per primary tag 
drop view if exists jewce.monthTagBalance;
create view jewce.monthTagBalance as
  select 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date, 
    unnest(ptags) as tag, 
    sum(val) as val 
  from 
    jewce.transactionhistory 
  where 
    description not in (select description from jewce.incomeFilter)
  group by 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM'), 
    unnest(ptags);


-- Monthly cost per primary tag 
drop view if exists jewce.monthTagCost;
create view jewce.monthTagCost as
  select 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date, 
    unnest(ptags) as tag, 
    sum(val) as val 
  from 
    jewce.transactionhistory 
  where 
    val < 0
    and description not in (select description from jewce.costFilter)
  group by 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM'), 
    unnest(ptags);


-- Monthly shared cost per primary tag 
drop view if exists jewce.monthTagSharedCost;
create view jewce.monthTagSharedCost as
  select 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date, 
    unnest(ptags) as tag, 
    sum(val) as val 
  from 
    jewce.transactionhistory 
  where 
    val < 0
    and description not in (select description from jewce.costFilter)
    and shared = true
  group by 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM'), 
    unnest(ptags);
    


-- Monthly income per primary tag 
drop view if exists jewce.monthTagIncome;
create view jewce.monthTagIncome as
  select 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM') as date, 
    unnest(ptags) as tag, 
    sum(val) as val 
  from 
    jewce.transactionhistory 
  where 
    val >= 0
    and description not in (select description from jewce.incomeFilter)
  group by 
    to_date(to_char(date, 'YYYY-MM'), 'YYYY-MM'), 
    unnest(ptags);

