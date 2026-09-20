# Decisions

## Initial decisions

- Build one fictional office evacuation rehearsal, not an information app.
- Use a static browser application so the core flow works without paid services or secrets.
- Use transparent adaptive rules instead of a hidden predictive model.
- Use browser voice recognition with a typed fallback.
- Keep all session data in memory and clear it on exit or refresh.
- Use allowlisted report templates plus a prohibited-claim guard.
- Require three fictional owners before launch.

## Rejected alternatives

- VR headset requirement: rejected because the Blueprint requires the lowest-cost useful medium.
- General LLM API: rejected because it adds secrets and unpredictable claims.
- Database and authentication: rejected because no personal or persistent data is required.
- Readiness score: prohibited by the Shadow Clause.

## Tomorrow's first move

Export the documented persona-test evidence as `PERSONA_FernandaEspinosa.pdf`, then record the three-minute demonstration.

## Session Close - 2026-09-20

- Completed the full fictional decision, voice/typed explanation, adaptive correction, retry, bounded result, and claim-guard flow.
- Published Deployment 1 for mechanical testing.
- Found and documented a real keyboard-focus defect.
- Fixed the defect, repeated regression checks, and published Deployment 2.
- Confirmed that no secrets, database, persistent storage, real personal data, or network data transfer were added.

## Session Close - Persona test and Deployment 3

- Completed the synthetic Lucia Hernandez persona test and logged every observed confusion.
- Selected the editable prohibited-claim example as the worst confusion because it looked like a statement the user was being asked to endorse.
- Replaced it with a static example labeled as system content and renamed the action to explain why the label is prohibited.
- Repeated syntax, source, and security regression checks.
- Published Deployment 3 with the persona-test correction.
