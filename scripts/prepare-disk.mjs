import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// Optional asset task: requires ffmpeg with libvpx-vp9 and libx264 in PATH.
// The original has 192 frames at 24 fps; frames 0 and 180 are nearby poses.
// Keep 0–180, then bridge with five intermediate frames before native looping.
// Equal time bases prevent the millisecond WebM timestamps from duplicating
// frames during overlay. RGB compositing and explicit BT.709 keep paper neutral.
const filters = [
  '[0:v]settb=1/24,setpts=N,format=rgba,lutrgb=r=238:g=236:b=229[paper]',
  '[1:v]settb=1/24,setpts=N,crop=1080:1080:420:0,scale=720:720,despill=type=green:mix=0.5[clean]',
  '[paper][clean]overlay=shortest=1:format=rgb,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,split=3[body][a][b]',
  '[body]trim=end_frame=181,setpts=PTS-STARTPTS[bodyout]',
  '[a]trim=start_frame=180:end_frame=181,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.25[tail]',
  '[b]trim=end_frame=1,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.25[head]',
  "[tail][head]blend=all_expr='A*(1-N/6)+B*(N/6)',trim=end_frame=5,setpts=PTS-STARTPTS[bridge]",
  '[bodyout][bridge]concat=n=2:v=1:a=0[out]',
].join(';')

const result = spawnSync(
  'ffmpeg',
  [
    '-v',
    'warning',
    '-y',
    '-f',
    'lavfi',
    '-i',
    'color=c=0xeeece5:s=720x720:r=24:d=8',
    '-c:v',
    'libvpx-vp9',
    '-i',
    'references/disquete-alpha.webm',
    '-filter_complex',
    filters,
    '-map',
    '[out]',
    '-an',
    '-c:v',
    'libx264',
    '-g',
    '12',
    '-crf',
    '21',
    '-preset',
    'fast',
    '-colorspace',
    'bt709',
    '-color_trc',
    'bt709',
    '-color_primaries',
    'bt709',
    '-movflags',
    '+faststart',
    'public/media/muski-disk.mp4',
  ],
  { cwd: fileURLToPath(new URL('..', import.meta.url)), stdio: 'inherit' },
)

if (result.error) throw result.error
if (result.status !== 0) throw new Error(`ffmpeg exited with ${result.status}`)
console.log('Prepared MUSKI360 loop: 186 frames, 24 fps, 7.75 seconds.')
