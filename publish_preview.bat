REM This batch file builds the voter app and deploys it to a firebase hosting preview channel.

ECHO Building voter app...
pushd voter_app
call npm run build
popd

ECHO Deploying to firebase hosting preview channel...
firebase hosting:channel:deploy preview