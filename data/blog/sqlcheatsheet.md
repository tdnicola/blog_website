---
title: sqlCheatSheet
date: '2022-10-25'
tags: []
draft: true
summary:
images: []
---

Problem ❓:  
Solution ✔️:

```sql
    select * from Openquery(SALESFORCE, 'select * from Account') x
    join [salesforce backups]..account a
                    on x.patient__c = a.id
                    and a.recordtypeid = '0128'
    where a.Patient_Lead_Stage__c = 'Lead class'


    /*Insert into new table*/
    drop table if exists #table
    select *
    into #table
    from account


    /*Create new table*/
    create table #table
    (
        ID nvarchar(50),
        name nvarchar(50)
        )


    /*Insert into exisiting table*/
    insert into #table ( id, name)
    select id, name
    from account


    /*While loop*/
    SET @Counter=1
    set @endloop=10

    WHILE (@Counter <= @RowCount)
    BEGIN
        print(@counter)
    END

    /*Error catching Begin/try */

    BEGIN try
        select * from asldfjla
    end try
    begin catch
        print('error in selecting')
    end catch

    /*Scanning folders for information on files*/

    CREATE TABLE #myfilestemp (
        directory NVARCHAR(255),
        depth INT,
        file_bit BIT
    )

    INSERT INTO #myfilestemp
    --EXEC master.sys.xp_dirtree 'E:\Chargeback\',0,1;
    EXEC master.sys.xp_dirtree '\\users\tony',2,1 --go 1/2 folders deep, grab files 1

    SELECT @filepath = 'dir "\\users\tony' + @sfilename + '\*.*"'
    delete from @temptable
    Insert into @temptable
    EXEC xp_cmdshell @filepath --opens cmd prompt and any results from @filepath become rows of data

    /*Deletes*/
    delete
    from ghostAccountMatches
    where id = '00T2T000'



```
