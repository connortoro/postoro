  //time text
  export function time_text(created_at: Date) : string {
    const now = new Date()
    const createdAt = new Date(created_at)
    const diff_minutes = (now.getTime() - createdAt.getTime()) / (1000*60)

    if(diff_minutes < 59) {
      return `${Math.ceil(diff_minutes)}m`
    }

    const diff_hours = diff_minutes / 60
    if (diff_hours < 23) {
      return `${Math.ceil(diff_hours)}h`
    }

    if(now.getFullYear() === createdAt.getFullYear()) {
      return createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    return createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
