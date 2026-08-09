import PortfolioScene from '../components/PortfolioScene';

/**
 * Root page — renders the Three.js portfolio scene.
 * The heavy lifting (Three.js, React UI, audio) all lives inside
 * PortfolioScene which is a client component.
 */
export default function Home() {
    return <PortfolioScene />;
}
