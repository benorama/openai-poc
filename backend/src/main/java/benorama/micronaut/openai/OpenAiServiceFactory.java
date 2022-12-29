package benorama.micronaut.openai;

import com.theokanning.openai.OpenAiService;
import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;

@Factory
public class OpenAiServiceFactory {
    @Singleton
    public OpenAiService openAiService(OpenAiServiceConfig openAiServiceConfig) {
        return new OpenAiService(openAiServiceConfig.getApiToken());
    }

}
