/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router.js';

describe("length of history stack", () => {
    test("starting length", () => {
        expect(history.length).toBe(1);
    });

    test("push one entry", () => {
        pushToHistory('settings');
        expect(history.length).toBe(2);
    });

    test("push multiple entries", () => {
        pushToHistory('entry', 4);
        pushToHistory('home');
        expect(history.length).toBe(4);
    });
});

describe("current state of history", () => {
    test("settings", () => {
        pushToHistory('settings');
        expect(history.state.page).toBe('settings');
    });
    test("entry", () => {
        pushToHistory('entry', 5);
        expect(history.state.page).toBe('entry5');
    });
    test("home", () => {
        pushToHistory('home');
        expect(history.state).toStrictEqual({});
    });
});
