import $ from 'jquery';
import Rx from 'rxjs/Rx';

const myPromise = new Promise((resolve, reject) => {
    console.log('Creating Promise');
    setTimeout(()=>{
        resolve('Hello from promise')
    }, 3000);
});

const source$ = Rx.Observable.fromPromise(myPromise);


// myPromise.then(x => {
//     console.log(x);
// })

// source$.subscribe(
//     x => {
//         console.log(x);
//     },
//     err => {
//         console.log(err);
//     },
//     complete => {
//         console.log('Completed');
//     })    

function getUser(username){
    return $.ajax({
        url: 'https://api.github.com/users/'+username,
        dataType: 'jsonp'
    }).promise();
}

const inputSource$ = Rx.Observable.fromEvent($('#input'),'keyup');
inputSource$.subscribe(e =>{
Rx.Observable.fromPromise(getUser(e.target.value))
    .subscribe(x => {
        console.log(x)
        $('#name').text(x.data.name);
        $('#blog').text(x.data.blog);
        $('#repos').text('Public Repos: '+x.data.public_repos);
    });
})
