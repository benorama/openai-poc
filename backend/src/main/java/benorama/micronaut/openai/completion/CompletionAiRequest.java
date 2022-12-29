package benorama.micronaut.openai.completion;

public class CompletionAiRequest {

    private String prompt;

    private Double temperature = (double) 0;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }
}
