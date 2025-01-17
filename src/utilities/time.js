export function timeSince(inputDate){
    let currentDate = new Date();
    let date = new Date(inputDate);

    let diff = currentDate - date;

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let months = Math.floor(weeks / 4);
    let years = Math.floor(months / 12);
    if(seconds < 30) return 'Just now';
    else if(seconds < 60) return `${seconds} seconds ago`;
    else if(minutes < 60) return `${minutes} minutes ago`;
    else if(hours < 24) return `${hours} hours ago`;
    else if(days < 7) return `${days} days ago`;
    else if(weeks < 4) return `${weeks} weeks ago`;
    else if(months < 12) return `${months} months ago`;
    else return `${years} years ago`;
}

export function formatDuration(seconds){
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let remainingSeconds = Math.round(seconds % 60);
    minutes = minutes % 60;
    if(hours > 0) return hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
    return minutes + ":" + (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds);
}