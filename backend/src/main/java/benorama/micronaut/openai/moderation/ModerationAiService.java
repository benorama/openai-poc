package benorama.micronaut.openai.moderation;

import com.theokanning.openai.OpenAiService;
import com.theokanning.openai.moderation.Moderation;
import com.theokanning.openai.moderation.ModerationRequest;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import retrofit2.HttpException;

import java.util.ArrayList;
import java.util.List;

@Singleton
public class ModerationAiService {
    public ModerationAiService(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    private static Logger logger = LoggerFactory.getLogger(ModerationAiService.class);

    public List<Moderation> moderate(String input, String model) {
        logger.info("Creating moderation...");
        ModerationRequest moderationRequest = ModerationRequest.builder()
                .model(model)
                .input(input)
                .build();
        List<Moderation> moderations = new ArrayList<>();
        try {
            moderations = openAiService.createModeration(moderationRequest).results;
        } catch (HttpException exception) {
            logger.error("An error occured while creating OpenApi Completion API request", exception);
        }
        return moderations;
    }

    private final OpenAiService openAiService;
}
