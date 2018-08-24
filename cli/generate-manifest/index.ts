#! /usr/bin/env node

import * as fs from 'fs-extra';
import * as path from 'path';

const PACKAGE_JSON: any = {};
const MANIFEST_SAMPLE = {
    name: PACKAGE_JSON.name || "NAME",
    short_name: PACKAGE_JSON.name || "SHORT_NAME",
    start_url: ".",
    display: "standalone",
    background_color: "#fff",
    description: PACKAGE_JSON.description || "DESCRIPTION",
    icons: [{
        src: "icons/48X48.png",
        sizes: "48x48",
        type: "image/png"
    }, {
        src: "icons/72x72.png",
        sizes: "72x72",
        type: "image/png"
    }, {
        src: "icons/96x96.png",
        sizes: "96x96",
        type: "image/png"
    }, {
        src: "icons/144x144.png",
        sizes: "144x144",
        type: "image/png"
    }, {
        src: "icons/168x168.png",
        sizes: "168x168",
        type: "image/png"
    }, {
        src: "icons/192x192.png",
        sizes: "192x192",
        type: "image/png"
    }],
    related_applications: [{
        platform: "play",
        url: ""
    }]
}

export async function generateManifest() {
    await fs.ensureDir(path.resolve('icons'));
    await fs.writeJSON(path.resolve('manifest.json'), MANIFEST_SAMPLE, { spaces: 2});
}

generateManifest()