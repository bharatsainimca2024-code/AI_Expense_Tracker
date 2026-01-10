package in.astha.expensetracker.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChatService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String handleChat(String userMessage) {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            List<Map<String, String>> messages = List.of(
                    Map.of("role", "system",
                            "content", "You are a smart AI assistant for an expense tracker app."),
                    Map.of("role", "user",
                            "content", userMessage)
            );

            Map<String, Object> body = new HashMap<>();
            body.put("model", "llama-3.3-70b-versatile"); // ✅ CORRECT MODEL
            body.put("messages", messages);
            body.put("temperature", 0.7);
            body.put("stream", false);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(apiUrl, request, Map.class);

            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>) responseBody.get("choices");

            Map<String, Object> message =
                    (Map<String, Object>) choices.get(0).get("message");

            return message.get("content").toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "AI service is currently unavailable.";
        }
    }
}
