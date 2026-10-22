# Contributing

Thanks for helping improve Code Craft Automation Lab. Contributions can include test improvements, clearer documentation, reliable workflow changes, and new learning examples.

## Before you start

- Open an issue to discuss larger changes before starting work.
- Keep changes focused and explain what behavior or documentation they improve.
- Never commit credentials, access tokens, private URLs, or generated reports containing sensitive information.
- Only run security scans against targets you own or are explicitly authorized to test.

## Local setup

```sh
npm ci
```

Use the local run commands in the [README](README.md#getting-started). Some checks require separate tools or accounts, such as K6, BrowserStack, and configured service credentials.

## Pull requests

1. Create a branch for your change.
2. Run the relevant test or validation command when practical.
3. Update documentation when behavior, setup, or workflow output changes.
4. Open a pull request with a short summary, validation performed, and any required secrets or external services.

Do not include generated test output or update BackstopJS reference images unless the visual change has been reviewed and the update is intentional.
