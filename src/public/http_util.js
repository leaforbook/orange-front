import React from 'react';

const Post = (url,data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("leaforbook-oneofus")
            })
        }).then(res => res.json())
            .catch(error => {
                reject('系统错误');
            })
            .then(response => {

                    if (response.status != undefined) {
                        reject('输入数据格式错误');
                    } else {
                        if(response.code === '0') {
                            resolve(response);
                        }else {
                            reject(response.msg);
                        }
                    }

                }
            );
    })

}

export default Post;