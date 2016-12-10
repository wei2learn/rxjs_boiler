import $ from 'jquery';
import Rx from 'rxjs/Rx';

// Rx.Observable.of('Hello')
//     .subscribe(v => {
//         Rx.Observable.of(v + ' Everone')
//             .subscribe(x => console.log(x));
//     })

// Rx.Observable.of('Hello')
//     .mergeMap(v => {
//         return Rx.Observable.of(v+' Everyone')
//     })
//     .subscribe(x => console.log(x));


function getUser(username){
    return $.ajax({
        url: 'https://api.github.com/users/'+username,
        dataType: 'jsonp'
    }).promise();
}

// const inputSource$ = Rx.Observable.fromEvent($('#input'),'keyup');
// inputSource$.subscribe(e =>{
// Rx.Observable.fromPromise(getUser(e.target.value))
//     .subscribe(x => {
//         console.log(x)
//         $('#name').text(x.data.name);
//         $('#blog').text(x.data.blog);
//         $('#repos').text('Public Repos: '+x.data.public_repos);
//     });
// })

const inputSource$ = Rx.Observable.fromEvent($('#input'),'keyup')
    .map(e => e.target.value)
    .switchMap(v => {
        return Rx.Observable.fromPromise(getUser(v))

    });

inputSource$.subscribe(x => {
        console.log(x)
        $('#name').text(x.data.name);
        $('#blog').text(x.data.blog);
        $('#repos').text('Public Repos: '+x.data.public_repos);
    });

