/* eslint-disable no-console,@typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const execa = require('execa');

(async () => {
  try {
    await execa('git', ['checkout', '--orphan', 'build']);
    // Understand if it's dist or build folder
    await execa('git', ['add', '--all']);
    await execa('git', ['reset', '--', 'node_modules', 'scripts']);
    await execa('git', ['commit', '-m', 'build']);
    console.log('Pushing to build branch...');
    await execa('git', ['push', 'origin', 'HEAD:build', '--force']);
    console.log('Successfully deployed');
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();
