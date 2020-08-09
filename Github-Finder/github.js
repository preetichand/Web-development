class Github {

    constructor(){
        this.client_id='c0664c9d1daf0816e515';
        this.client_secret='97045aa3c46000e6e996b1c3e5937a94009708cc';
        this.repos_count=5;
        this.repos_sort='created:asc';
    }

    async getUser(user){
        const profileResponse=await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);


        const repoResponse=await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile=await profileResponse.json();
        const repos=await repoResponse.json();

        return{
            profile,
            repos
        }
    }
}