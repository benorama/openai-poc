package benorama.micronaut.openai;

import benorama.micronaut.openai.completion.CompletionAiService;
import benorama.micronaut.openai.completion.CompletionAiRequest;
import benorama.micronaut.openai.completion.CompletionAiResponse;
import benorama.micronaut.openai.moderation.ModerationAiRequest;
import benorama.micronaut.openai.moderation.ModerationAiResponse;
import benorama.micronaut.openai.moderation.ModerationAiService;
import com.theokanning.openai.moderation.Moderation;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;

import java.util.ArrayList;
import java.util.List;

@Controller("/openai")
public class OpenAiController {

    private final CompletionAiService completionAiService;
    private final OpenAiServiceConfig openAiServiceConfig;
    private final ModerationAiService moderationAiService;

    public OpenAiController(CompletionAiService completionAiService, OpenAiServiceConfig openAiServiceConfig, ModerationAiService moderationAiService) {
        this.completionAiService = completionAiService;
        this.openAiServiceConfig = openAiServiceConfig;
        this.moderationAiService = moderationAiService;
    }

    @Post("/completions")
    public HttpResponse<CompletionAiResponse> complete(CompletionAiRequest completionAiRequest) {
        CompletionAiResponse completionAiResponse = new CompletionAiResponse();
        ArrayList<String> texts = completionAiService.complete(
                completionAiRequest.getPrompt(),
                completionAiRequest.getTemperature(),
                completionAiRequest.getMaxTokens(),
                openAiServiceConfig.getCompletionModel(),
                "some-user-identity-id"
        );
        if (texts.size() > 0) {
            // Return first choice by default
            completionAiResponse.setText(texts.get(0));
        }
        return HttpResponse.ok(completionAiResponse);
    }

    @Post("/moderations")
    public HttpResponse<ModerationAiResponse> moderate(ModerationAiRequest moderationAiRequest) {
        List<Moderation> moderations = moderationAiService.moderate(moderationAiRequest.getInput(), openAiServiceConfig.getModerationModel());
        ModerationAiResponse moderationAiResponse = new ModerationAiResponse();
        moderationAiResponse.setModerations(moderations);
        return HttpResponse.ok(moderationAiResponse);
    }

}
