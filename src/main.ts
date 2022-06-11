import * as core from '@actions/core';
import * as github from '@actions/github';
import { Octokit } from '@octokit/rest';
import { getChangeLog } from './util';

async function main(): Promise<void> {
  try {
    const token = core.getInput('token');
    const prettier = core.getInput('prettier');
    const prereleaseFlags = core.getInput('prerelease-flags');
    const branch = core.getInput('branch', { required: true });
    const trigger = core.getInput('trigger', { required: true });
    const changelogs = core.getInput('changelogs', { required: true });

    const octokit = new Octokit({ auth: `token ${token}` });

    const { owner, repo } = github.context.repo;
    const { ref_type: refType, ref: version } = github.context.payload;

    core.info(`owner: ${owner}, repo: ${repo}`);
    core.info(`ref_type: ${refType}, ref: ${version}`);

    if (trigger !== refType) {
      core.error("[Actions] The input 'trigger' not match actions 'on'\"");
      return;
    }

    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;
    const response = await fetch(`${url}/${changelogs}`);
    const data = await response.json();
    const [changelog] = getChangeLog(data, version, prettier !== '');

    let pre = false;
    if (prereleaseFlags) {
      const flags = prereleaseFlags.split(',');
      for (const flag of flags) {
        if (version.includes(flag)) {
          core.info(`[Actions] [Version: ${version}] include ${flag}! Go prerelease!`);
          pre = true;
          break;
        }
      }
    }

    await octokit.repos.createRelease({
      owner,
      repo,
      tag_name: version,
      name: version,
      body: changelog,
      prerelease: pre,
    });

    core.info(`[Actions] Success release ${version}.`);
  } catch (e: any) {
    core.error(`[Actions] Error: ${e.message}`);
  }
}

main();
