#### GoldenCity is a modern real estate investment platform that combines traditional property investing with cryptocurrency payments. Built with React and Tailwind CSS, it mirrors the functionality of Arrived.com while adding blockchain-based transaction capabilities.

## Key Features

- Cryptocurrency-enabled property transactions
- Mobile-responsive design
- SEO-optimized architecture
- Real-time market data integration
- Interactive 3D property visualization
- Smart contract integration for secure transactions

## Technical Overview

The platform is built using:

- React for component-based architecture
- Tailwind CSS for responsive styling
- React Router for client-side routing
- Three.js for 3D property visualizations
- Web3.js for blockchain interactions



## Acknowledgments

Special thanks to the Arrived.com team for inspiration and the React/Tailwind CSS communities for their continued support and resources.

## Test Cases Results

🧪 Frontend Testing

The frontend of this application has been thoroughly tested using Jest along with React Testing Library to ensure UI components render correctly and behave as expected.

✅ Testing Highlights

Component Rendering: Verified that all major sections (Hero, Stats, Mission, Team, Cryptocurrencies, Awards) render correctly.

Content Verification: Checked that key headings, descriptions, stats, and text content are displayed accurately.

Icons & Images: Ensured that all icons (from react-icons) and images (both local and external) appear correctly and have appropriate alt attributes for accessibility.

Layout & Styling: Confirmed responsive layouts and Tailwind CSS classes for grids, headings, and sections to ensure proper display across devices.

Accessibility: Validated semantic HTML structure, heading hierarchy, and presence of alt attributes on all images.

Error Handling & Resilience: Tested edge cases such as missing images and verified that the component renders without throwing errors.

Performance: Checked that all sections render efficiently and key text content is available synchronously.

⚡ Tools Used

Jest: For running test suites and assertions.

React Testing Library: For DOM testing and simulating user interactions.

Mocks: External libraries such as react-icons and framer-motion were mocked to isolate the component logic and focus on rendering correctness.

These tests provide confidence that the frontend is robust, accessible, and responsive, ensuring a seamless user experience.

<!-- ---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------|---------|----------|---------|---------|-------------------
All files            |   95.41 |    85.71 |     100 |   96.63 |
 components/layout   |     100 |      100 |     100 |     100 |
  Footer.jsx         |     100 |      100 |     100 |     100 |
  Navbar.jsx         |     100 |      100 |     100 |     100 |
 pages               |   95.08 |    84.84 |     100 |   96.36 |
  About.jsx          |     100 |      100 |     100 |     100 |
  Blog.jsx           |     100 |      100 |     100 |     100 |
  BlogPost.jsx       |     100 |      100 |     100 |     100 |
  FAQ.jsx            |     100 |      100 |     100 |     100 |
  Home.jsx           |     100 |      100 |     100 |     100 |
  NotFound.jsx       |     100 |      100 |     100 |     100 |
  Privacy.jsx        |     100 |      100 |     100 |     100 |
  Properties.jsx     |   88.23 |       80 |     100 |   90.24 | 113,121,129,146
  Property3D.jsx     |     100 |      100 |     100 |     100 |
  PropertyDetail.jsx |     100 |      100 |     100 |     100 |
---------------------|---------|----------|---------|---------|-------------------

Test Suites: 12 passed, 12 total
Tests:       295 passed, 295 total
Snapshots:   2 passed, 2 total
Time:        14.611 s
Ran all test suites.
Done in 19.70s. -->
