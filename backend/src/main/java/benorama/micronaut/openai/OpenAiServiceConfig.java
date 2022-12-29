package benorama.micronaut.openai;

import io.micronaut.context.annotation.ConfigurationProperties;
import io.micronaut.core.bind.annotation.Bindable;

import javax.validation.constraints.NotBlank;

@ConfigurationProperties("openai")
public interface OpenAiServiceConfig {
    @NotBlank
    String getApiToken();

    @Bindable(defaultValue = "text-davinci-003")
    @NotBlank
    String getCompletionModel();

    @Bindable(defaultValue = "text-davinci-003")
    @NotBlank
    String getModerationModel();
}
