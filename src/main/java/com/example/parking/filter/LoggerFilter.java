package com.example.parking.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;

@Component
@Slf4j
public class LoggerFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        var req = new ContentCachingRequestWrapper( (HttpServletRequest) request);
        var res = new ContentCachingResponseWrapper( (HttpServletResponse) response);

        chain.doFilter(req, res); // objects passed to controllers or any further steps are wrapped as ContentCachingWrapper

        var requestBody = new String(req.getContentAsByteArray());
        var uri = req.getRequestURI();
        var method = req.getMethod();

        // Ignore Swagger UI requests
        if (!uri.startsWith("/swagger-ui.html") && !uri.startsWith("/webjars/") &&
                !uri.startsWith("/swagger-resources") && !uri.startsWith("/v2/api-docs")) {

            // ... existing logging code ...
            // request info
            var headerNames = req.getHeaderNames();
            var headerValues = new StringBuilder();

            headerNames.asIterator().forEachRemaining(headerKey -> {
                var headerValue = req.getHeader(headerKey);

                // authorization-token : ???, user-agent : ???
                headerValues.append("[")
                        .append(headerKey)
                        .append(" : ")
                        .append(headerValue)
                        .append("]")
                ;

            });

            log.info(">>>>> uri : {}, method : {}, header : {}, body : {}",uri, method, headerValues, requestBody);

            // response info
            var responseHeaderValues = new StringBuilder();

            res.getHeaderNames().forEach(headerKey -> {
                var headerValue = res.getHeader(headerKey);

                responseHeaderValues
                        .append("[")
                        .append(headerKey)
                        .append(" : ")
                        .append(headerValue)
                        .append("]");
            });

            var responseBody = new String(res.getContentAsByteArray());

            log.info("<<<<< uri : {}, method : {}, header : {}, body : {}", uri, method, responseHeaderValues, responseBody);

            res.copyBodyToResponse();

        }

    }
}

