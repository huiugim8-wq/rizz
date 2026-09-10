#!/bin/zsh
set -euo pipefail

root_dir="/Users/heejunkim/Desktop/00000000/rizz"
video_dir="$root_dir/public/video/rizz-youtube-showreel"
source_dir="$video_dir/sources"
work_dir="/tmp/rizz-home-film-v19-motion-work"
output_file="$video_dir/rizz-home-film-v19-motion.mp4"

mkdir -p "$work_dir"

encode=( -an -c:v libx264 -preset fast -crf 15 -profile:v high -level 4.2 -pix_fmt yuv420p -r 30 )
dark="eq=brightness=-0.055:contrast=1.06:saturation=0.88,vignette=PI/5"

# 01. The HOTDOG TV origin. This deliberately follows the dark opening rhythm
# of v15 while keeping all homepage captions outside the video.
ffmpeg -hide_banner -loglevel error -y \
  -ss 7.0 -t 4.0 -i "$source_dir/JFbUFNyyuhs.mp4" \
  -vf "crop=1280:640:0:40,scale=1920:960:flags=lanczos,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/01-origin.mp4"

# 02. Real moving creator conversation rather than portrait stills.
ffmpeg -hide_banner -loglevel error -y \
  -ss 0.0 -t 4.0 -i "$source_dir/1LDbhPOio3Q.mp4" \
  -vf "crop=1280:640:0:20,scale=1920:960:flags=lanczos,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/02-creators.mp4"

# 03. Preserve the accepted 2018 → 2020 office expansion in motion.
ffmpeg -hide_banner -loglevel error -y \
  -ss 38.6 -t 2.2 -i "$source_dir/C8VMUnSGafY.mp4" \
  -ss 15.2 -t 2.2 -i "$source_dir/JFbUFNyyuhs.mp4" \
  -filter_complex "
    [0:v]crop=1280:640:0:20,scale=1920:960:flags=lanczos,fps=30,settb=AVTB,setsar=1,$dark,format=yuv420p[a];
    [1:v]crop=1280:640:0:20,scale=1920:960:flags=lanczos,fps=30,settb=AVTB,setsar=1,$dark,format=yuv420p[b];
    [a][b]xfade=transition=fade:duration=0.24:offset=1.88,format=yuv420p[v]
  " \
  -map "[v]" -t 4.0 "${encode[@]}" "$work_dir/03-office.mp4"

# 04. YOGO is shown as one clearly framed portrait video, with no still-image
# collage or stretched mobile footage.
ffmpeg -hide_banner -loglevel error -y \
  -ss 4.0 -t 4.0 -i "$source_dir/c4QeB2sbcqQ.mp4" \
  -vf "scale=540:960:flags=lanczos,pad=1920:960:690:0:color=#070707,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/04-yogo.mp4"

# 05. Owned media is represented by a creator speaking on camera. Keep this
# moving and legible instead of cutting to the source's black title card.
ffmpeg -hide_banner -loglevel error -y \
  -ss 2.5 -t 4.0 -i "$source_dir/iynwLv5LJuY.mp4" \
  -vf "crop=1280:640:0:40,scale=1920:960:flags=lanczos,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/05-owned-media.mp4"

# 06. RIZZ creator business uses a moving group scene from the accepted v15
# source sequence.
ffmpeg -hide_banner -loglevel error -y \
  -ss 0.0 -t 4.0 -i "$source_dir/C8VMUnSGafY.mp4" \
  -vf "crop=1280:640:0:20,scale=1920:960:flags=lanczos,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/06-rizz-creators.mp4"

# 07. F&B: both panels are moving source video—Sushi Jun on the left and the
# hotdog business on the right.
ffmpeg -hide_banner -loglevel error -y \
  -ss 2.0 -t 4.0 -i "$source_dir/eXRp7SBd9I8-ceo.mp4" \
  -ss 1274.0 -t 4.0 -i "$source_dir/0hhrpONDxJM-ceo.mp4" \
  -filter_complex "
    [0:v]crop=1080:1080:360:0,scale=960:960:flags=lanczos,fps=30,settb=AVTB,setsar=1,$dark,format=yuv420p[left];
    [1:v]crop=1080:1080:420:0,scale=960:960:flags=lanczos,fps=30,settb=AVTB,setsar=1,$dark,format=yuv420p[right];
    [left][right]hstack=inputs=2,format=yuv420p[v]
  " \
  -map "[v]" -t 4.0 "${encode[@]}" "$work_dir/07-fnb.mp4"

# 08. The headquarters/office move remains a moving sequence.
ffmpeg -hide_banner -loglevel error -y \
  -ss 25.0 -t 4.0 -i "$source_dir/JFbUFNyyuhs.mp4" \
  -vf "crop=1280:640:0:20,scale=1920:960:flags=lanczos,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/08-headquarters.mp4"

# 09. Academy launch with an actual lecture in progress.
ffmpeg -hide_banner -loglevel error -y \
  -ss 4.0 -t 4.0 -i "$source_dir/si8DLow9iQ4.mp4" \
  -vf "crop=1920:960:0:60,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/09-academy.mp4"

# 10. The traffic-to-business cycle is backed by a real presentation and
# audience, not an illustrative still.
ffmpeg -hide_banner -loglevel error -y \
  -ss 16.8 -t 3.0 -i "$source_dir/JFbUFNyyuhs-revenue.mp4" \
  -vf "crop=1280:640:0:20,scale=1920:960:flags=lanczos,setpts=4*PTS/3,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/10-cycle.mp4"

# 11. Finish the story with the team moving inside the office.
ffmpeg -hide_banner -loglevel error -y \
  -ss 8.0 -t 4.0 -i "$source_dir/BpDP5G3S7Zk.mp4" \
  -vf "crop=1920:960:0:60,setsar=1,$dark" \
  "${encode[@]}" "$work_dir/11-team.mp4"

# 12. No empty end card. The final black RIZZ DOM title sits on a bright,
# still-visible moving team shot.
ffmpeg -hide_banner -loglevel error -y \
  -ss 30.0 -t 4.0 -i "$source_dir/BpDP5G3S7Zk.mp4" \
  -vf "crop=1920:960:0:60,setsar=1,lutrgb=r='val*0.28+184':g='val*0.28+184':b='val*0.28+184'" \
  "${encode[@]}" "$work_dir/12-outro.mp4"

ffmpeg -hide_banner -loglevel error -y \
  -i "$work_dir/01-origin.mp4" \
  -i "$work_dir/02-creators.mp4" \
  -i "$work_dir/03-office.mp4" \
  -i "$work_dir/04-yogo.mp4" \
  -i "$work_dir/05-owned-media.mp4" \
  -i "$work_dir/06-rizz-creators.mp4" \
  -i "$work_dir/07-fnb.mp4" \
  -i "$work_dir/08-headquarters.mp4" \
  -i "$work_dir/09-academy.mp4" \
  -i "$work_dir/10-cycle.mp4" \
  -i "$work_dir/11-team.mp4" \
  -i "$work_dir/12-outro.mp4" \
  -filter_complex "[0:v][1:v][2:v][3:v][4:v][5:v][6:v][7:v][8:v][9:v][10:v][11:v]concat=n=12:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -movflags +faststart "$output_file"

ffmpeg -hide_banner -loglevel error -y -ss 1.0 -i "$output_file" \
  -frames:v 1 -q:v 2 "$video_dir/rizz-home-film-v19-motion-poster.jpg"

ffmpeg -hide_banner -loglevel error -y -i "$output_file" \
  -vf "fps=1/2.4,scale=384:192,tile=5x4:padding=4:margin=4" \
  -frames:v 1 -q:v 2 "$video_dir/rizz-home-film-v19-motion-contact-sheet.jpg"

echo "$output_file"
