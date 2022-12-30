export class ModerationResult {

    flagged: boolean = false;

    categories: ModerationCategories = new ModerationCategories();

    categoryScores: ModerationCategoryScores = new ModerationCategoryScores();

}

export class ModerationCategories {
    hate: boolean = false;

    hateThreatening: boolean = false;

    selfHarm: boolean = false;

    sexual: boolean = false;

    sexualMinors: boolean = false;

    violence: boolean = false;

    violenceGraphic: boolean = false;
}

export class ModerationCategoryScores {
    hate: number = 0;

    hateThreatening: number = 0;

    selfHarm: number = 0;

    sexual: number = 0;

    sexualMinors: number = 0;

    violence: number = 0;

    violenceGraphic: number = 0;
}