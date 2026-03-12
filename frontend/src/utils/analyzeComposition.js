export function analyzeComposition(selectedAgents, roleSummary, selectedMap) {

    let score = 50;

    const strengths = [];
    const weaknesses = [];
    const attackSuggestions = [];
    const defenseSuggestions = [];
    const replacementIdeas = [];

    const duelistCount = roleSummary.Duelist;
    const controllerCount = roleSummary.Controller;
    const initiatorCount = roleSummary.Initiator;
    const sentinelCount = roleSummary.Sentinel;

    if (controllerCount >= 1) {
        score += 10;
        strengths.push("Has controller utility for site control.");
    } else {
        score -= 20;
        weaknesses.push("No controller selected.");
        replacementIdeas.push("Consider adding Omen or Brimstone.");
    }

    if (initiatorCount >= 1) {
        score += 10;
        strengths.push("Has initiator utility for information.");
    } else {
        score -= 15;
        weaknesses.push("No initiator selected.");
    }

    if (sentinelCount >= 1) {
        score += 10;
        strengths.push("Has sentinel for defense.");
    } else {
        score -= 15;
        weaknesses.push("No sentinel selected.");
    }

    if (duelistCount >= 1) {
        score += 10;
        strengths.push("Has duelist entry potential.");
    } else {
        score -= 15;
        weaknesses.push("No duelist selected.");
    }

    if (duelistCount >= 2) {
        attackSuggestions.push("Use aggressive site executes.");
    }

    if (sentinelCount >= 1) {
        defenseSuggestions.push("Use sentinel to anchor one site.");
    }

    if (attackSuggestions.length === 0) {
        attackSuggestions.push("Play slow defaults before committing.");
    }

    if (defenseSuggestions.length === 0) {
        defenseSuggestions.push("Focus on crossfires and rotations.");
    }

    if (score > 100) score = 100;
    if (score < 0) score = 0;

    let roleBalance = "Average";

    if (
        duelistCount >= 1 &&
        controllerCount >= 1 &&
        initiatorCount >= 1 &&
        sentinelCount >= 1
    ) {
        roleBalance = "Good";
    }

    return {
        score,
        roleBalance,
        strengths,
        weaknesses,
        attackSuggestions,
        defenseSuggestions,
        replacementIdeas
    };
}