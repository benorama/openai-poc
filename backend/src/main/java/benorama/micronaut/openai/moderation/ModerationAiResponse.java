package benorama.micronaut.openai.moderation;

import com.theokanning.openai.moderation.Moderation;

import java.util.List;

public class ModerationAiResponse {

    private List<Moderation> moderations;

    public List<Moderation> getModerations() {
        return moderations;
    }

    public void setModerations(List<Moderation> moderations) {
        this.moderations = moderations;
    }
}


