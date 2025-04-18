export const samplePosts = [
    {
        id: '1',
        title: 'Getting Started with React',
        summary: 'Learn the basics of React, including components, props, state, and the virtual DOM to build your first interactive application.',
        author: 'Conor Brown',
        date: '2023-01-01', // ISO format
        url: '/posts/1',
        content: '<h1>Heading</h1><p>Some paragraph text</p><h2>Subheading</h2><p>More paragraph text</p>',
    },
    {
        id: '2',
        title: 'CSS Grid vs. Flexbox',
        summary: 'A deep dive comparison of CSS Grid and Flexbox, exploring their strengths, weaknesses, and use cases for modern web layouts.',
        author: 'Conor Brown',
        date: '2023-02-15',
        url: '/posts/2',
        content: '<h1>Heading</h1><p>Some paragraph text</p><h2>Subheading</h2><p>More paragraph text</p>',
    },
    {
        id: '3',
        title: 'Accessibility in Web Development',
        summary: 'Essential tips and techniques for making your web applications accessible to users of all abilities, covering ARIA, semantic HTML, and more.',
        author: 'Conor Brown',
        date: '2023-03-10',
        url: '/posts/3',
        content: '<h1>Heading</h1><p>Some paragraph text</p><h2>Subheading</h2><p>More paragraph text</p>',
    },
    {
        id: '4',
        title: 'Understanding React Hooks',
        summary: 'Explore useState, useEffect, and other fundamental React Hooks to manage state and side effects in functional components efficiently.',
        author: 'Conor Brown',
        date: '2023-04-22',
        url: '/posts/4',
        content: '<h1>Heading</h1><p>Some paragraph text</p><h2>Subheading</h2><p>More paragraph text</p>',
    },
    {
        id: '5',
        title: 'Vite: The Modern Frontend Tool',
        summary: 'Discover why Vite is becoming the go-to build tool for modern web development, offering lightning-fast HMR and optimized builds.',
        author: 'Conor Brown',
        date: '2023-05-30',
        url: '/posts/5',
        content: '<h1>Heading</h1><p>Some paragraph text</p><h2>Subheading</h2><p>More paragraph text</p>',
    },
];

export const setPost = (allPosts, newPost) => {
    //check if post was in the list and then update the list
    let found = false;
    for (let i = 0; i < allPosts.length; i++) {
        if (allPosts[i].id == newPost.id) {
            allPosts[i] = newPost;
            found = true;
        }
    }
    if (!found) {
        allPosts.unshift(newPost);
    }
}