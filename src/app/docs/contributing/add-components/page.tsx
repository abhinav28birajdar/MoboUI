export default function AddComponentDocsPage() {
    return (
        <div className="prose dark:prose-invert max-w-3xl">
            <h1>Contributing: Adding Components</h1>
            <p>
                Thank you for your interest in contributing! Here is how you can add a new component to the library.
            </p>

            <h2>Process</h2>
            <ol>
                <li>Fork the repository</li>
                <li>Create a new branch <code>feat/new-component-name</code></li>
                <li>Add your component code to <code>lib/components/</code></li>
                <li>Register the component in <code>lib/data/components.ts</code></li>
                <li>Add a preview in <code>src/components/emulator/PreviewRegistry.tsx</code></li>
                <li>Submit a Pull Request</li>
            </ol>

            <h2>Guidelines</h2>
            <ul>
                <li>Ensure your component is responsive</li>
                <li>Support both Light and Dark modes</li>
                <li>Use TypeScript for type safety</li>
                <li>Keep dependencies to a minimum</li>
            </ul>
        </div>
    );
}
