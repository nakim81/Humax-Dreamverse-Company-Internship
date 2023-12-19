package com.example.parking.scheduler;

import com.example.parking.batch.ChangeBookStateJob;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class BatchScheduler {
    @Autowired
    private JobLauncher jobLauncher;
    @Autowired
    private ChangeBookStateJob changeBookStateJob;

    @Scheduled(cron = "0 0 0/1 * * *")
    public void runJob(){
        log.info("배치 스케줄러 작동");
        
        JobParameters jobParameters = new JobParametersBuilder()
                .addString("jobName", "changeBookStateJob" + System.currentTimeMillis())
                .toJobParameters();

        try{
            jobLauncher.run(changeBookStateJob.ChangeBookStateJob(), jobParameters);
        }catch(JobExecutionAlreadyRunningException
        | JobInstanceAlreadyCompleteException
        | JobParametersInvalidException
        | org.springframework.batch.core.repository.JobRestartException e){
            log.error(e.getMessage());
        }


        log.info("배치 스케줄러 작동 완료");
    }
}
