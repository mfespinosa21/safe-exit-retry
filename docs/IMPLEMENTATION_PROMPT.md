# Implementation Prompt - Safe Exit Retry

You are the coding agent for **Safe Exit Retry**, a narrow Week 6 Business Bending prototype. Read `docs/PACKET.md` completely before changing code. Treat the packet and the Team 1 Blueprint as binding product requirements.

Do not broaden the product. Build one working rehearsal loop and make it reliable, testable, accessible, and deployable with a free stack.

## Product outcome

Build a fictional browser-based emergency rehearsal for an institutional responder. The primary exit becomes unavailable. The responder selects an alternative route, gives a short voice explanation or uses the typed fallback, receives one specific simulated correction owned by a fictional human trainer, and completes one adaptive retry.

Every screen that reports or interprets behavior must show:

> **PERFORMANCE IN SIMULATION**  
> This observation describes one fictional rehearsal only. It is not a readiness, compliance, competence, safety, survival, certification, or risk-reduction result.

The product must never create a readiness score, safety score, compliance result, competence result, survival prediction, certification, or real-world risk claim.

## Required working slice

The finished live application must support this exact journey:

1. User opens a landing screen and sees that the module is fictional and bounded.
2. Launch stays disabled until three fictional owner roles are assigned:
   - Program owner: Elena Ruiz.
   - Operational owner: Carlos Vega.
   - Training/safety owner: Tomas Leon.
3. User starts one calm office-hallway video-simulation or interactive simulated environment.
4. The primary exit becomes visibly blocked.
5. User selects one route: Stair B, Elevator, or Wait here.
6. User briefly explains the choice through browser voice input.
7. If microphone access is unavailable or denied, the user can type the explanation.
8. Adaptive logic combines route choice and explanation pattern to select one correction.
9. The correction identifies one observable simulated behavior, names Tomas Leon as owner, explains one next action, and offers a retry.
10. The retry changes according to the first mistake.
11. The user makes a second decision.
12. The final screen reports only bounded observations from the simulation.
13. An attempted prohibited label or export is blocked by the claim-boundary guard.
14. An **Exit simulation** control is available on every scenario, correction, retry, and result screen.

## Dragon Stack - multiplicative requirement

The three required technologies must affect the same decision loop.

### 1. Simulation layer

- Build an interactive simulated environment or a clearly labeled video-simulation.
- Use the image-generated mockup at `docs/assets/safe-exit-retry-mockup.png` as visual direction.
- The environment must show a calm fictional office corridor and a blocked primary exit.
- Do not show injuries, people in distress, flames, panic, graphic damage, countdown pressure, or loud startle effects.

### 2. Adaptive logic layer

- Use transparent, predefined browser logic stored in structured data.
- Route choice plus the voice/typed explanation determines the correction and retry.
- Label every interpretation **Simulated adaptive output**.
- Do not falsely describe the rule engine as a diagnostic or predictive AI system.

### 3. Voice layer

- Use the browser Web Speech API when supported.
- Provide a visible recording state, stop control, transcript preview, and permission-error state.
- Provide a typed fallback with identical adaptive behavior.
- Never upload, store, or retain audio.
- Clear the temporary transcript when the session ends, refreshes, or exits.

If the voice explanation does not influence the correction branch, the Dragon Stack fails. If the adaptive branch does not modify the retry, the Dragon Stack fails.

## Simplest free stack

- React + Vite + TypeScript.
- Plain CSS or CSS Modules.
- Local JSON or TypeScript objects for fictional scenario data.
- Browser Web Speech API with typed fallback.
- Vitest + React Testing Library for mechanical tests.
- Free static deployment only.
- No backend, database, authentication provider, paid API, API key, or secret.

Do not add Supabase because this slice stores no data. Do not add a general LLM API. Do not create unnecessary infrastructure.

## Data model

Create a small explicit schema for:

- Scenario ID and fictional label.
- Screen/state ID.
- Route options.
- First decision.
- Temporary explanation transcript.
- Explanation pattern.
- Observable behavior statement.
- Corrective action.
- Fictional human owner.
- Retry variant.
- Second decision.
- Permitted result statement.

All data must be fictional. Do not seed real names other than the fictional names specified in the packet.

## Adaptive rules

Implement at least these four deterministic branches:

| First-pass input | Observation | Correction | Retry |
|---|---|---|---|
| Elevator | Selected the elevator after the primary exit became unavailable | Review why elevators are excluded in this fictional exercise | Disable Elevator and request a safe alternate route |
| Wait here without checking | Did not select an available alternate route | Practice scanning for marked alternate exits | Highlight two route signs without naming the answer |
| Stair B with explanation that omits condition checking | Selected Stair B, but did not explain checking conditions | Practice stating the route check before moving | Add a second blocked-path cue |
| Stair B with bounded safe reasoning | Selected the predefined safe alternative in this simulation | Repeat the decision under one changed condition | Change one environmental cue |

Use a small allowlist of fictional keywords or phrases for explanation patterns. Document the mapping in code and `DECISIONS.md`. Do not infer personality, emotion, competence, or real-world capability from the transcript.

## Claim-boundary guard

This is the defining Adversary feature, not optional copy.

Create:

1. An allowlisted result template that can report only observable simulated behavior.
2. A denylist covering at least: ready, readiness, compliant, compliance, competent, competence, safe, safety score, certified, certification, survival, survival probability, risk reduction, lower risk, earthquake-ready.
3. A visible demo control that attempts to change the report label or export purpose.
4. A blocked state that explains why the claim is not permitted.

Acceptance rule: no path through the UI can produce a prohibited claim as a result label. The denylist is a secondary control; the primary control is that reports are assembled only from allowlisted templates.

## Features and acceptance criteria

### Feature 1 - Shell, boundaries, and ownership gate

Build the app shell, fictional labels, safety copy, owner assignment, and immediate exit.

Acceptance criteria:

- The landing screen names Safe Exit Retry.
- It states that the scenario and people are fictional.
- The three owner roles and fictional names are visible.
- Start is disabled when any owner is absent.
- The boundary label is visible before the simulation starts.
- Exit simulation is visible on every later step.
- Exiting clears the in-memory session and returns to the landing screen.

### Feature 2 - First simulated decision

Build the calm blocked-exit environment and route options.

Acceptance criteria:

- Primary exit is visibly unavailable.
- Stair B, Elevator, and Wait here are keyboard-accessible buttons.
- Only one first route can be selected.
- No score or positive/negative badge appears.
- The simulation is clearly labeled fictional.

### Feature 3 - Voice with typed fallback

Build voice capture and fallback.

Acceptance criteria:

- Supported browsers can start and stop voice input.
- Transcript is shown for confirmation.
- Microphone denial produces a clear non-blocking message.
- Typed input can always replace voice input.
- Input is trimmed, sanitized, and limited to 240 characters.
- Empty input cannot be submitted.
- Audio and transcript are never persisted.

### Feature 4 - Adaptive correction and retry

Combine route and explanation pattern.

Acceptance criteria:

- Each required first-pass branch returns the correct observation, correction, and retry.
- Output says **Simulated adaptive output**.
- Correction names Tomas Leon as the fictional human owner.
- Retry differs for at least three first-pass branches.
- The user can complete exactly one retry.

### Feature 5 - Bounded result and claim guard

Build the final observation summary and blocked-claim demonstration.

Acceptance criteria:

- Final result uses **Performance in simulation** as its title.
- It includes first decision, corrective action, and second decision as observations.
- It contains no total score, percentage, stars, badge, pass/fail certification, or prediction.
- Prohibited label/export attempts are blocked.
- Boundary warning explains the reason in plain language.
- Exit clears all temporary content.

### Feature 6 - Accessibility and responsive polish

Acceptance criteria:

- Full journey works using keyboard only.
- Focus is visible.
- Buttons and labels have accessible names.
- Color is not the only carrier of meaning.
- Layout works at desktop and mobile widths.
- Reduced-motion preference is respected.

## Mechanical tests

Automate or manually document all of the following:

1. Launch cannot begin with a missing owner.
2. Exit works from every step and clears session state.
3. Elevator maps to the elevator correction.
4. Wait here maps to scanning correction.
5. Stair B without condition language maps to condition-check correction.
6. Stair B with bounded safe language maps to the changed-condition retry.
7. Microphone denial enables typed fallback.
8. Empty and over-240-character inputs are rejected or safely limited.
9. Two different first-pass mistakes produce different retries.
10. Boundary label appears on all interpretation and result screens.
11. All prohibited claim attempts are blocked.
12. Refresh and exit do not retain transcript or result.
13. Keyboard navigation completes the entire journey.
14. No real personal data, secret, network request, or persistent storage is present.

Keep evidence in `docs/TEST_LOG.md` with date, environment, expected result, actual result, status, and screenshot filename when applicable.

## Required bug-fix-redeploy cycle

The mechanical pass must discover and document at least one genuine defect. Do not invent a bug after the fact.

Required sequence:

1. Deploy version 1.
2. Run the complete mechanical test plan against the live URL.
3. Record at least one failing behavior in `docs/TEST_LOG.md`.
4. Create an issue note in `docs/BUG_FIX.md` with reproduction steps, root cause, fix, and regression test.
5. Commit the fix separately.
6. Redeploy version 2.
7. Repeat the failed test and relevant regression tests on the live URL.
8. Record evidence that the redeployed version passes.

## Persona test

After deployment 2, capture screenshots of every screen in journey order. In a fresh chat, use this fictional persona:

> You are Lucia Hernandez, 38, a fictional office floor response coordinator in Mexico City. You have completed routine drills, use a laptop comfortably, become impatient with long instructions, and worry that a low training result could be used against you at work. Attempt the task as Lucia. Narrate where you hesitate, what you misunderstand, and where you would quit. Pay special attention to microphone permission and whether the result feels like an employment score.

Log every confusion in `docs/PERSONA_TEST.md`. Fix the single worst confusion, add a regression test when possible, commit the change, and update deployment 2 or create a later deployment while still preserving evidence of the required first and second deployments.

## Security Floor

Before each deployment, verify and record:

- No secrets, tokens, API keys, `.env` values, or credentials exist in code or Git history.
- No backend or persistent user-data store exists.
- All names and scenario data are fictional and labeled.
- Every text input has a type check, trim, sanitization, and length limit.
- Voice data is not uploaded or saved.
- No raw HTML injection or `dangerouslySetInnerHTML` is used.
- No prohibited real-world claim can be generated.
- Dependency audit has no unresolved critical issue.

If storage or personal data is added despite the scope cut, stop. Do not deploy until authentication and Row Level Security are designed and tested.

## Commit plan

Use at least seven small, meaningful commits. Do not combine the entire application into one commit.

1. `chore: initialize safe exit retry and documentation`
2. `feat: add fictional ownership gate and boundary labels`
3. `feat: build blocked-exit simulation and route decision`
4. `feat: add voice explanation with typed fallback`
5. `feat: implement adaptive correction and retry branches`
6. `feat: enforce bounded results and prohibited-claim guard`
7. `test: add mechanical coverage and deployment evidence`

The required bug fix must be an additional standalone commit:

8. `fix: resolve <actual bug found during live testing>`

The persona-test improvement must also be separate:

9. `fix: improve <actual confusion found in persona test>`

## Deployment plan

### Deployment 1 - working vertical slice

Deploy after Features 1-5 work end-to-end and the Security Floor passes. Save the live URL, commit SHA, timestamp, and visible version label in `docs/DEPLOYMENTS.md`.

### Deployment 2 - tested and corrected slice

Deploy only after the mechanical test exposes a bug, the bug is fixed, regression tests pass locally, and the Security Floor is rechecked. Record the second URL or deployment/version identifier, commit SHA, timestamp, bug fixed, and tests repeated.

Do not treat a local preview as a deployment.

## Documentation requirements

Maintain:

- `docs/PACKET.md`
- `docs/IMPLEMENTATION_PROMPT.md`
- `docs/DECISIONS.md`
- `docs/TEST_LOG.md`
- `docs/BUG_FIX.md`
- `docs/PERSONA_TEST.md`
- `docs/DEPLOYMENTS.md`
- `README.md`

README must state:

- Fictional training prototype.
- Performance in simulation only.
- Not a real emergency system.
- Not a readiness, compliance, safety, survival, certification, or risk tool.
- Free stack and how to run locally.

## Session Close - mandatory every work session

Before ending any session:

1. Update `docs/DECISIONS.md` with decisions made, alternatives rejected, and why.
2. Add **Tomorrow's first move** as one concrete next action.
3. Update relevant test/deployment documents.
4. Run formatting, lint, tests, and build.
5. Confirm the Security Floor still passes.
6. Commit with a meaningful message.
7. Push to the remote repository.
8. Confirm the working tree is clean.

Never end a session with undocumented decisions or uncommitted work.

## Stop conditions

Stop and ask before proceeding if any requested change would:

- Add real personal data.
- Add a real emergency workflow.
- Require a paid service or secret.
- Create a readiness, compliance, competence, safety, survival, certification, or risk claim.
- Remove the immediate exit.
- Store voice or transcript data.
- Replace human ownership with an automatic certification decision.
- Expand beyond the single scenario and single retry before the working slice is complete.

## Definition of done

The build is done only when:

- The live URL completes the exact end-to-end journey.
- The Dragon Stack is demonstrably multiplicative.
- All adaptive outputs are labeled simulated.
- The claim guard blocks prohibited uses.
- All six Blueprint conditions have visible evidence.
- At least five commits exist; the target plan contains nine.
- At least two deployments exist.
- The mechanical test, genuine bug, fix, regression test, and redeploy are documented.
- The persona test and its worst-confusion fix are documented.
- Security Floor checks pass.
- `DECISIONS.md` contains the last Session Close and tomorrow's first move.

Do not begin implementation until the user explicitly says to start building.
