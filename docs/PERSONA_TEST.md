# Persona Test - Lucia Hernandez

**Date:** 2026-09-20

**Prototype:** Safe Exit Retry, after Deployment 2
**Method:** Fresh synthetic-persona chat using the complete screen sequence in journey order.

## Persona

Lucia Hernandez is a fictional 38-year-old office floor response coordinator in Mexico City. She has completed routine drills, uses a laptop comfortably, becomes impatient with long instructions, and worries that a low training result could be used against her at work.

## Screen-by-screen findings

### 1. Setup

Lucia understood that the module was fictional but felt nervous when the disclaimer listed competence, compliance, and certification. She was unsure whether checking the three owners meant acknowledging them or personally assigning responsibility.

### 2. Route choice

She selected Stair B and avoided the elevator based on prior drills. She worried that using **Exit simulation** might be recorded as failure or refusal.

### 3. Explanation

She hesitated at the microphone request and was unsure whether the transcript might be visible to her employer. She preferred the typed fallback and wanted clearer reassurance that typing was equally acceptable.

### 4. Correction

The phrases **Observed behavior** and **Simulated adaptive output** sounded like formal employee assessment language. Naming the trainer also made her wonder whether he would receive the answer.

### 5. Retry

She understood that a cue had changed but worried that changing her decision might mean admitting that the first response was wrong.

### 6. Result and claim boundary

The result timeline still felt like a performance record. The largest confusion was the editable field prefilled with **Ready for a real earthquake**. Lucia did not understand that it was a system demonstration and feared that clicking the button would submit or approve that statement.

### 7. Blocked claim

After the block appeared, she understood the purpose but felt that the system had tricked her into requesting a claim she had not written.

## Confusion log

| Priority | Confusion |
|---|---|
| High | The prefilled real-earthquake claim looked like a statement Lucia was being asked to endorse. |
| High | It was unclear who could see the result, transcript, or decision history. |
| Medium | Owner checkboxes did not clearly distinguish acknowledging from assigning responsibility. |
| Medium | Voice input did not initially make typed input feel equally valid. |
| Medium | Observed behavior and adaptive output sounded like employee-assessment language. |
| Low | Lucia wondered whether Exit simulation would be recorded negatively. |
| Low | A changed cue could make the first decision feel graded as wrong. |

## Worst confusion

The prefilled **Ready for a real earthquake** claim was the worst confusion because it looked like a real-world statement Lucia was being asked to submit. She was likely to quit rather than risk creating a report that could be used against her.

## Fix implemented

The editable field was removed. The interface now says:

> **Example of a label the simulation must reject:** “Ready for a real earthquake”

The button now says **Show why this label is not allowed**. Supporting copy states that the example is not the user's statement and is not part of the user's result.

## Retest expectation

Lucia should understand the feature as a system-boundary demonstration before clicking. The user no longer types, requests, or appears to endorse the prohibited claim.
