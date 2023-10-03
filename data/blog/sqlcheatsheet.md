---
title: SQLCheatSheet
date: 6/3/23
tags: ['SQL']
draft: false
summary:
images: []
---

Problem ❓:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Random thoughts = random codes.

Solution ✔️:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Put those random codes in one place.

---

```sql


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


    /*Insert into existing table*/
    insert into #table ( id, name)
    select id, name
    from account


    /*While loop*/
    SET @Counter=1
    set @endloop=10

    WHILE (@Counter <= @RowCount)
    BEGIN
        print(@counter)
        SET @Counter = @Counter + 1
    END

    /*Error catching Begin/try */
    BEGIN try
        select * from Account
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
    EXEC master.sys.xp_dirtree '\\users\tony',2,1 --go 1/2 folders deep, grab files 1

    SELECT @filepath = 'dir "\\users\tony' + @sfilename + '\*.*"'
    Insert into @temptable
    EXEC xp_cmdshell @filepath --opens cmd prompt and any results from @filepath become rows of data

    /*Deletes*/
    delete
    from ghostAccountMatches
    where id = '00T2T000'


    /*find files and parent folders*/
    CREATE TABLE #DirTree (
        Id int identity(1,1),
        SubDirectory nvarchar(255),
        Depth smallint,
        FileFlag bit,
        ParentDirectoryID int
    )

    INSERT INTO #DirTree (SubDirectory, Depth, FileFlag)
    EXEC master..xp_dirtree '\\EQAWSSFTP\SFTPServer\Health Centers', 2, 1

    UPDATE #DirTree
    SET ParentDirectoryID = (
        SELECT MAX(Id) FROM #DirTree d2
        WHERE Depth = d.Depth - 1 AND d2.Id < d.Id
    )
    FROM #DirTree d


    /*UPDATING/DELETING IN BATCHES*/
    DECLARE @BATCHSIZE INT, @WAITFORVAL VARCHAR(8), @ITERATION INT, @TOTALROWS INT, @MAXRUNTIME VARCHAR(8), @BSTOPATMAXTIME BIT, @MSG VARCHAR(500)
    SET DEADLOCK_PRIORITY LOW;
    SET @BATCHSIZE = 4000
    SET @WAITFORVAL = '00:00:10'
    SET @ITERATION = 0 -- LEAVE THIS
    SET @TOTALROWS = 0 -- LEAVE THIS

    WHILE @BATCHSIZE>0
    BEGIN
        begin tran
        DELETE TOP(@BATCHSIZE)
        from accountDetails
        where PBDetailID in (select PBDetailID from pbsToDelete)

        SET @BATCHSIZE=@@ROWCOUNT
        SET @ITERATION=@ITERATION+1
        SET @TOTALROWS=@TOTALROWS+@BATCHSIZE
        SET @MSG = 'Iteration: ' + CAST(@ITERATION AS VARCHAR) + ' Total deletes:' + CAST(@TOTALROWS AS VARCHAR)
        RAISERROR (@MSG, 0, 1) WITH NOWAIT
        WAITFOR DELAY @WAITFORVAL
        commit tran
    END


    /**See what jobs are currently running**/
    SELECT
        ja.job_id,
        j.name AS job_name,
        ja.start_execution_date,
        ISNULL(last_executed_step_id,0)+1 AS current_executed_step_id,
        Js.step_name
    FROM msdb.dbo.sysjobactivity ja
    LEFT JOIN msdb.dbo.sysjobhistory jh
        ON ja.job_history_id = jh.instance_id
    JOIN msdb.dbo.sysjobs j
        ON ja.job_id = j.job_id
    JOIN msdb.dbo.sysjobsteps js
        ON ja.job_id = js.job_id
        AND ISNULL(ja.last_executed_step_id,0)+1 = js.step_id
    WHERE ja.session_id = (SELECT TOP 1 session_id FROM msdb.dbo.syssessions ORDER BY agent_start_date DESC)
    AND start_execution_date is not null
    AND stop_execution_date is null
    order by start_execution_date

    /*Quick way to count rows on a big table*/
    SELECT Total_Rows= SUM(st.row_count)
    FROM sys.dm_db_partition_stats st
    WHERE object_name(object_id) = 'TableNAME' AND (index_id < 2)

    /*See column types*/
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME   = 'TABLE_NAME'


```
