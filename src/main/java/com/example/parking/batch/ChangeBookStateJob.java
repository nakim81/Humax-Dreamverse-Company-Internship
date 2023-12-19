package com.example.parking.batch;

import com.example.parking.common.enums.BookState;
import com.example.parking.entity.Book;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.time.LocalDateTime;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class ChangeBookStateJob {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final EntityManagerFactory entityManagerFactory;

    private int chunkSize = 10;

    @Bean
    public Job ChangeBookStateJob(){
        return new JobBuilder("ChangeBookStateJob", jobRepository)
                .start(ChangeBookStateJob_step())
                .build();
    }

    @Bean
    public Step ChangeBookStateJob_step(){
        return new StepBuilder("step", jobRepository)
                .<Book, Book>chunk(chunkSize, transactionManager)
                .reader(jpaPagingItemReader())
                .processor(jpaProcessor())
                .writer(jpaItemWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Book> jpaPagingItemReader(){
        HashMap<String, Object> paramValues = new HashMap<>();
        paramValues.put("currentTime", LocalDateTime.now());

        return new JpaPagingItemReaderBuilder<Book>()
                .name("jpaPagingItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(chunkSize)
                .queryString("select b from Book b where b.state='1' and b.endTime<=:currentTime")
                .parameterValues(paramValues)
                .build();
    }

    @Bean
    public ItemProcessor<Book, Book> jpaProcessor(){
        return book -> {
            book.setState(BookState.NO_USE);
            return book;
        };
    }

    @Bean
    public JpaItemWriter<Book> jpaItemWriter(){
        JpaItemWriter<Book> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(entityManagerFactory);
        return jpaItemWriter;
    }
}