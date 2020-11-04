# bartekbanach.dev portfolio

Folder structure convention:

If component is simple, just use it like that:

-   myComponent:
    -   index.tsx - main component file
    -   styles.tsx - styles of component
    -   hooks.ts - hooks that needs huge amount of code
    -   utils.ts - utility functions

If component is not simple then:

-   we can create sub-components with the same, simple structure
-   we can use folders for more stuff:
    -   components - simple presentations components
    -   styles - styles divided into multiple files
    -   hooks - hooks and state management
    -   utils - utility functions

The preferred way is the first one presented above.
