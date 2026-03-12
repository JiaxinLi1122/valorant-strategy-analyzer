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
        strengths.push("Has controller utility for site takes and map control.");
        attackSuggestions.push(
            "Use controller smokes to block key sightlines before committing to a site hit."
        );
    } else {
        score -= 20;
        weaknesses.push("No controller selected, so smoke coverage is missing.");
        replacementIdeas.push("Consider adding Omen or Brimstone for stronger map control.");
    }

    if (initiatorCount >= 1) {
        score += 10;
        strengths.push("Has initiator utility for information and team support.");
        attackSuggestions.push(
            "Use initiator utility first to gather information before sending duelists in."
        );
    } else {
        score -= 15;
        weaknesses.push("No initiator selected, so information gathering is limited.");
        replacementIdeas.push("Consider adding Sova or Skye for scouting and team setup.");
    }

    if (sentinelCount >= 1) {
        score += 10;
        strengths.push("Has sentinel presence for anchoring and defensive stability.");
        defenseSuggestions.push(
            "Let the sentinel anchor one site and free the rest of the team to rotate faster."
        );
    } else {
        score -= 15;
        weaknesses.push("No sentinel selected, so defensive setups may be weak.");
        replacementIdeas.push("Consider adding Killjoy or Cypher for better site security.");
    }

    if (duelistCount >= 1) {
        score += 10;
        strengths.push("Has duelist entry potential for taking space.");
        attackSuggestions.push(
            "Let the duelist take first contact after support utility is used."
        );
    } else {
        score -= 15;
        weaknesses.push("No duelist selected, so entry pressure may be low.");
        replacementIdeas.push("Consider adding Jett or Raze for stronger entry pressure.");
    }

    if (
        duelistCount === 1 &&
        controllerCount === 1 &&
        initiatorCount >= 1 &&
        sentinelCount === 1
    ) {
        score += 10;
        strengths.push("The composition has strong overall role balance.");
    }

    if (duelistCount >= 2) {
        score += 5;
        strengths.push("Double duelist can create aggressive entry pressure.");
        weaknesses.push("Heavy duelist focus may reduce utility depth.");
        attackSuggestions.push(
            "Use fast-paced executes to take advantage of double duelist pressure."
        );
        replacementIdeas.push(
            "If the team feels too aggressive, replace one duelist with a sentinel or initiator."
        );
    }

    if (controllerCount >= 2) {
        score += 5;
        strengths.push("Double controller can improve map control and executes.");
        attackSuggestions.push(
            "Layer controller utility to fake pressure on one site and hit the other."
        );
    }

    if (initiatorCount >= 2) {
        score += 5;
        strengths.push("Double initiator provides strong scouting and support utility.");
        defenseSuggestions.push(
            "Use one initiator for early info and save the second for retake support."
        );
    }

    if (sentinelCount >= 2) {
        score += 3;
        strengths.push("Extra sentinel utility can strengthen site holds.");
        weaknesses.push("Too much defensive utility may reduce attack flexibility.");
        defenseSuggestions.push(
            "Spread sentinel utility across the map to slow enemy defaults."
        );
    }

    if (selectedMap === "Ascent") {
        if (controllerCount >= 1 && initiatorCount >= 1 && sentinelCount >= 1) {
            score += 8;
            strengths.push("This composition fits Ascent well with balanced control and info.");
            attackSuggestions.push(
                "On Ascent, use info utility for mid control before splitting onto a site."
            );
            defenseSuggestions.push(
                "On Ascent, keep strong utility around mid and one anchor on each site."
            );
        } else {
            weaknesses.push("Ascent usually benefits from balanced control, info, and anchoring.");
        }
    }

    if (selectedMap === "Bind") {
        if (controllerCount >= 1 && initiatorCount >= 1) {
            score += 8;
            strengths.push("This composition can support Bind executes and fast site pressure.");
            attackSuggestions.push(
                "On Bind, group utility for quick teleporter pressure and explosive site hits."
            );
        } else {
            weaknesses.push("Bind often needs strong execute utility and coordinated support.");
        }
    }

    if (selectedMap === "Split") {
        if (sentinelCount >= 1 && controllerCount >= 1) {
            score += 8;
            strengths.push("This composition fits Split with good choke control and defense.");
            defenseSuggestions.push(
                "On Split, use sentinel utility to delay pushes and hold narrow choke points."
            );
        } else {
            weaknesses.push("Split often rewards strong stall and smoke control.");
        }
    }

    if (selectedMap === "Haven") {
        if (initiatorCount >= 1 && sentinelCount >= 1) {
            score += 8;
            strengths.push("This composition fits Haven with info gathering and flexible defense.");
            defenseSuggestions.push(
                "On Haven, play for early information so your team can rotate across all three sites."
            );
        } else {
            weaknesses.push("Haven often benefits from strong information and site coverage.");
        }
    }

    if (attackSuggestions.length === 0) {
        attackSuggestions.push("Play slower defaults and avoid dry peeking without support utility.");
    }

    if (defenseSuggestions.length === 0) {
        defenseSuggestions.push("Prioritize crossfires and early communication to compensate for utility gaps.");
    }

    if (replacementIdeas.length === 0) {
        replacementIdeas.push(
            "The composition is already fairly balanced, so only make changes for map preference or player comfort."
        );
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

    if (
        duelistCount === 1 &&
        controllerCount === 1 &&
        initiatorCount >= 1 &&
        sentinelCount === 1
    ) {
        roleBalance = "Excellent";
    }

    if (
        controllerCount === 0 ||
        initiatorCount === 0 ||
        sentinelCount === 0 ||
        duelistCount === 0
    ) {
        roleBalance = "Weak";
    }

    return {
        score,
        roleBalance,
        strengths,
        weaknesses,
        attackSuggestions,
        defenseSuggestions,
        replacementIdeas,
    };
}