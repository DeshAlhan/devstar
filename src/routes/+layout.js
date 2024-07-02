import tools from './tools.json';

export async function load({ route, url }) {
    return {
        meta: getMeta(route, url)
    };
}

function getMeta(route, url) {
    if (route.id && route.id.includes("(tools)")) {
        const toolKey = url.pathname.replace("/", "");
        const tool = tools[toolKey];
        if (tool) {
            return {
                title: tool.name,
                description: tool.description,
                contributors: tool.contributors
            };
        }
    }
    return null; // or any default value as needed
}
