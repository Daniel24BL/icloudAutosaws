module.exports = {
    apps: [
        {
            name: 'frontend',
            script: 'npm',  
            args: 'run build && vite',  
            watch: false,
        },
    ],
};
