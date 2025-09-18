# COI-COD-Brute-Force
Allows users to brute force the COI/COD codes students are *supposed* to get from Colorado College department faculty. Use this software at your own risk.

From my experience, Banner crashes after about 15,000 requests.

https://github.com/user-attachments/assets/74892a30-5999-4b86-9b79-346f106704a8



## Run Locally

Clone the project

```bash
git clone https://github.com/WbcEgaBn/COI-COD-Brute-Force.git
```

Go to the project directory

```bash
cd COI-COD-Brute-Force
```

Install dependencies

```bash
nvm install stable
npm init playwright@latest
``` 

#### Run the program using the debugger and add a breakpoint where noted. Your CC credentials should be entered manually.
```
let username: string = "j_gomez2024";
let password: string = "thisismypassowrd";
```
Currently, the default browser is set to Safari, you can change this in the config. I found issued with 2FA authenticaion when using Chrome.
