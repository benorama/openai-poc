package benorama.micronaut.openai.completion;

import com.theokanning.openai.OpenAiService;
import com.theokanning.openai.completion.CompletionRequest;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import retrofit2.HttpException;

import java.util.ArrayList;

@Singleton
public class CompletionAiService {
    public CompletionAiService(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    private static Logger logger = LoggerFactory.getLogger(CompletionAiService.class);

    public ArrayList<String> complete(String prompt, Double temperature, String model, String user) {
        logger.info("Creating completion...");
        CompletionRequest completionRequest = CompletionRequest.builder()
                .model(model)
                .prompt(prompt)
                .temperature(temperature)
                .user(user)
                .maxTokens(256)
                .build();
        ArrayList<String> texts = new ArrayList<String>();
        try {
            openAiService.createCompletion(completionRequest)
                    .getChoices()
                    .forEach(completionChoice -> texts.add(completionChoice.getText()));
        } catch (HttpException exception) {
            logger.error("An error occured while creating OpenApi Completion API request", exception);
        }
        return texts;
    }

    private final OpenAiService openAiService;
}
