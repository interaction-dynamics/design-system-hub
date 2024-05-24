# design-system-manager

The only solution to maintain your design system that is developer-friendly AND designer-friendly.

It can replace Storybook and much more.

It is a work in progress and is not ready for use yet. This is built in public so feel free to check our [wiki](https://github.com/interaction-dynamics/design-system-manager/wiki) for more information.

![image](https://github.com/interaction-dynamics/design-system-manager/assets/4005226/e8118830-1d55-47ff-b248-8c69634ae384)

## Getting started

If you want to start using this tool:

```bash
cd packages/documentation-portal # only this part is started

pnpm install

echo "FIGMA_TOKEN={FIGMA_TOKEN}" >> .env.local
echo "FIGMA_FILE_IDS={FIGMA_FILE_ID}" >> .env.local

pnpm dev

```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code practices and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
