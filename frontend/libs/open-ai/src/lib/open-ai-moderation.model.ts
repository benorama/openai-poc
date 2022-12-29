export interface Moderation {

    flagged: boolean;

    categories: ModerationCategories;

    categoryScores: ModerationCategoryScores;

}

export interface ModerationCategories {
    hate: boolean;

    hateThreatening: boolean;

    selfHarm: boolean;

    sexual: boolean;

    sexualMinors: boolean;

    violence: boolean;

    violenceGraphic: boolean;
}

export interface ModerationCategoryScores {
    hate: number;

    hateThreatening: number;

    selfHarm: number;

    sexual: number;

    sexualMinors: number;

    violence: number;

    violenceGraphic: number;
}