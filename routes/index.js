var upload = require('../libs/multer');
var passport = require("../libs/passport");
var User = require("../models/user");
var Resident = require("../models/residents");
var Building = require("../models/building");
var Post = require("../models/post");
var mongoose = require("mongoose");
var async = require("async");

var Marcet = require("../models/b_marcet");
var Torgoviy = require("../models/b_torgoviy");
var Tovar = require("../models/b_tovari");
var Zamovlenia = require("../models/b_zamovlenia");

function getMainPosts(callback, options = {}) {
  Post
    .find({ size: { $ne: 'small' } })
    .sort({ $natural: -1 })
    .limit(options.limit || 5)
    .skip(options.skip || 0)
    .exec(function(err, posts) {
        if (err) console.error(err.message);
        callback(posts || []);
    });
}

function getSmallPosts(callback) {
  Post
    .find({ size: 'small' })
    .sort({ $natural: -1 })
    .limit(5)
    .exec(function(err, posts) {
        if (err) console.error(err.message);
        callback(posts || []);
    });
}

function getHotPosts(callback) {
  Post
    .find({})
    .select({title: 1, _id: 1})
    .sort({ $natural: -1 })
    .limit(12)
    .exec(function(err, posts) {
        if (err) console.error(err.message);
        callback(posts || []);
    });
}


function getHotOrders(callback) {
  Zamovlenia
    .find({})
    .select({title: 1, _id: 1})
    .sort({ $natural: -1 })
    .limit(12)
    .exec(function(err, posts) {
        if (err) console.error(err.message);
        callback(posts || []);
    });
}







function getPostsCount(callback) {
  Post.countDocuments({ size: { $ne: 'small' } }, function(err, count) {
    if (err) console.error(err.message);
    callback(count);
  });
}

function getPostById(id, callback) {
  Post.findById(id, function(err, post) {
    if (err) console.error(err.message);
    callback(post);
  });
}

function getUserById(id, callback) {
  User.findUserById(id, function(err, user) {
      if (err) console.error(err.message);
      callback(user || {});
  });
}

function getNewsByTagName(tag_name, callback, options = {}) {
  Post
    .find({ tag_name: tag_name })
    .sort({ $natural: -1 })
    .limit(options.limit || 12)
    .skip(options.page ? (options.page - 1) * (options.limit || 12) : 0)
    .exec(function(err, post) {
      if (err) console.error(err.message);
      callback(post || []);
    });
}

function getNewsCount(tag_name, callback) {
  Post.countDocuments({ tag_name: tag_name }, function(err, count) {
    if (err) console.error(err.message);
    callback(count);
  });
}

function getNews(tag_name, callback, options) {
  async.parallel({
    news: function(callback) {
      getNewsByTagName(tag_name, function(posts) {
        callback(null, posts);
      }, options);
    },
    newsPagesCount: function(callback) {
      getNewsCount(tag_name, function(count) {
        callback(null, Math.round((count / (options.limit || 12)) + 0.45));
      });
    }
  }, function(err, result) {
    callback(result.news, result.newsPagesCount);
  });
}

module.exports = function(app) {
    
    app.post('/b_marcet', function(req,res,next) {
      console.log(req.query,req.body)
      
      Marcet.createMarcet(new Marcet({
            nfirm: req.body.nfirm,
            nmisto: req.body.nmisto,
            nstreet: req.body.nstreet,
            nhouse: req.body.nhouse,
            znizka: req.body.znizka           
        }), function(err, Marcet) {
            if (err) {
                console.error(err.message);
            }

            console.log(Marcet);
            res.send({});
            next();
        });
    })

      app.post('/b_new_torgoviy', function(req,res,next) {
      console.log(req.query,req.body)
      
      Torgoviy.createTorgoviy(new Torgoviy({
            name: {
                fName: req.body.fName,
                lName: req.body.lName,
                mName: req.body.mName
            },
            birth: req.body.birth,
            idcode: req.body.idcode,
            avtomobil: req.body.avtomobil,
            work: req.body.work,
            study: req.body.study,
            prumitka: req.body.prumitka         
        }), function(err, Torgoviy) {
            if (err) {
                console.error(err.message);
            }

            console.log(Torgoviy);
            res.send({});
            next();
        });
    })





    
    app.post('/b_pryxid', function(req,res,next) {
      console.log(req.query,req.body)
      
      Tovari.createTovari(new Tovari({
            namet: req.body.namet,
            ntip: req.body.ntip,
            nvir: req.body.nvir,
            npos: req.body.npos,
            ncolor: req.body.ncolor,
            nlitr: req.body.nlitr,
            nzak: req.body.nzak,
            nopt: req.body.nopt,
            nrozd: req.body.nrozd,
            nkil: req.body.nkil      
        }), function(err, Tovari) {
            if (err) {
                console.error(err.message);
            }

            console.log(Tovari);
            res.send({});
            next();
        });
    })



app.post('/marcetfiler', async function(req,res,next) {

    let {nfirm, nmisto, nstreet, nhouse, znizkaFrom, znizkaTo} = req.body;
    let query = {
      znizka: { $gte: +znizkaFrom, $lte: +znizkaTo },
      nfirm: req.body.nfirm,
      nmisto: req.body.nmisto,
      nstreet: req.body.nstreet,
      nhouse: req.body.nhouse,
    };
    for (let key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    let magazin = await Marcet.find(query);

    res.send(magazin);
})

app.post('/ckladfiler', async function(req,res,next) {

    let {namet, ntip, nvir, npos, ncolor, nlitr, nzak, nopt, nrozd} = req.body;
    let query = {
      namet: req.body.namet,
      ntip: req.body.ntip,
      nvir: req.body.nvir,
      npos: req.body.npos,
      ncolor: req.body.ncolor,
      nlitr: req.body.nlitr,
      nzak: req.body.nzak,
      nopt: req.body.nopt,
      nrozd: req.body.nrozd,
    };
 //   console.log("____",req.body);
    for (let key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    let ckladik = await Tovar.find(query);
   // console.log("GGGGGGGGGGGGGGG",ckladik);
    res.send(ckladik);

})

app.post('/b_tovari', function(req,res,next) {
      console.log(req.query,req.body)
      
      Tovar.createTovar(new Tovar({
            namet: req.body.namet,
            ntip: req.body.ntip,
            nvir: req.body.nvir,
            npos: req.body.npos,
            ncolor: req.body.ncolor,
            nlitr: req.body.nlitr,
            nzak: req.body.nzak,
            nopt: req.body.nopt,
            nrozd: req.body.nrozd,
            nkil: req.body.nkil           
        }), function(err, Tovar) {
            if (err) {
                console.error(err.message);
            }

            res.send({});
            next();
        });
    })


app.post('/b_zamovlenia', function(req,res,next) {
      console.log(req.query,req.body)
      const masivv = req.body.masivtov.map(el => ({ tovaID: el.id, count: el.count }));

      Zamovlenia.createZamovlenia(new Zamovlenia({
            tochka: req.body.tochka,
            masivtov: masivv,
            torgo: req.body.torgo,
                    
        }),
         function(err, Zamovlenia) {
            if (err) {
                console.error(err.message);
            }

            res.send({});
            next();
        });
    })
  








    app.get('/feed', async (req, res) => {
      var current_page = req.query.page || 1;

      const hotOrders = await Zamovlenia
        .find({})
        .sort({ $natural: -1 })
        .limit(12);
   
      const hotnews = await Post
        .find({})
        .sort({ $natural: -1 })
        .limit(16);

     //  const Marcets = await Marcet.find({});
      //  const zamovlenia = await Zamovlenia.find({})
      //  .sort({ $natural: -1 })
      //  .limit(50);
      //  const Personal = await Torgoviy.find({})
    const zminazam = await Zamovlenia.find({})
    const torgov = await Torgoviy.find({ _id: { $in: zminazam.map(el => el.torgo) } });
    const tochkaz = await Marcet.find({ _id: { $in: zminazam.map(el => el.tochka) } });
    
    let products = [];
    let torgoviagent = [];
    let magalinu = [];
    let zamovlen = [];

    let tovari = zminazam.map(e => e.masivtov.map(yyy => yyy["tovaID"]));

    for (let i = 0; i < tovari.length; i++) {
      products.push(await Tovar.find({ _id: { $in: tovari[i] } }));
    }

    zminazam.forEach((zam,index) => {
      torgoviagent.push (torgov[torgov.findIndex(t => t._id.toString() == zam.torgo.toString())]);
    });
    zminazam.forEach(zam => {
      magalinu.push (tochkaz[tochkaz.findIndex(t => t._id.toString() == zam.tochka.toString())]);
    });
    //console.log ("magaz",magalinu);
    //console.log ("TORGOVIY",torgoviagent);

    for (let i = 0; i < zminazam.length; i++) {
      zamovlen.push({
        number: zminazam[i].number,
        _id: zminazam[i]._id,
        tochka: magalinu[i],
        masivtov: products[i],
        torgo: torgoviagent[i],
      });
    }

//      console.log(zamovlen);

       res.render('pages/frontpage', {
           admin: req.session.admin,
           hotOrders: hotOrders, 
           orders: zamovlen,
 
           postsPagesCount: 0
       });
    });

    app.get('/city', function(req, res) {
      getNews('ogolochenia', function(posts, pagesCount) {
        //console.log(posts);
        res.render('pages/news', {
          admin: req.session.admin,
          mainNews: posts,
          postsPagesCount: pagesCount,
          currentPage: req.query.page,
          tagPageName: 'ogolochenia'
        });
      }, {
        limit: 16,
        page: req.query.page
      });
    });

    app.get('/advertisement', function(req, res) {
      getNews('advertisement', function(posts, pagesCount) {
        res.render('pages/news', {
          admin: req.session.admin,
          mainNews: posts,
          postsPagesCount: pagesCount,
          currentPage: req.query.page,
          tagPageName: 'advertisement'
        });
      }, {
        limit: 16,
        page: req.query.page
      });
    });

    app.get('/sport', function(req, res) {
      getNews('sport', function(posts, pagesCount) {
        res.render('pages/news', {
          admin: req.session.admin,
          mainNews: posts,
          postsPagesCount: pagesCount,
          currentPage: req.query.page,
          tagPageName: 'sport'
        });
      }, {
        limit: 16,
        page: req.query.page
      });
    });

    app.get('/culture', function(req, res) {
      getNews('aktsia', function(posts, pagesCount) {
        res.render('pages/news', {
          admin: req.session.admin,
          mainNews: posts,
          postsPagesCount: pagesCount,
          currentPage: req.query.page,
          tagPageName: 'aktsia'
        });
      }, {
        limit: 16,
        page: req.query.page
      });
    });

    app.get('/post', async function(req, res, next) {
      if (!(req.query.id && mongoose.Types.ObjectId.isValid(req.query.id))) {
        res.redirect('/feed');
        return next();
      }
     
      const hotOrders = await Zamovlenia
        .find({})
        .sort({ $natural: -1 })
        .limit(12);
      
      const hotpost = await Post.findById(req.query.id);
        

      const hotuser = await User.findById(hotpost.sender);
        console.log(hotpost);
      res.render('pages/post', {
          admin: req.session.admin,
          post: hotpost,
          sender: hotuser,
          hotOrders: hotOrders,
          smallPosts: []
      });

    });

    app.get('/*', function(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('authenticated');
            req.session.admin = true;
            next();
        } else {
            console.log('non authorized');
            req.session.admin = false;
            res.redirect('/feed');
        }
    });

    app.get('/', function(req, res) {
        res.redirect('/feed');
    });

    app.get('/residents', function(req, res) {
        if (req.query.add && req.query.buldId) {
            res.render('pages/new-resident', {admin: req.session.admin});
        } else if (req.query.edit && req.query.residentId) {
            Resident.findById(req.query.residentId, function(err, resident) {
                if (err) conso.error(err.message);

                res.render('pages/residents', {admin: req.session.admin, resident: resident});
            });
        } else if (req.query.id && mongoose.Types.ObjectId.isValid(req.query.id)) {
            Resident.findById(req.query.id, function(err, resident) {
                if (err) {
                    console.error(err.message);
                }

                Building.findById(resident.building, function(err, building) {
                    if (err) console.error(err.message);

                    res.render('pages/person', {
                        admin: req.session.admin,
                        person: resident,
                        building: building
                    });
                });
            });
        } else {
            Resident.find({}, function(err, residents) {
                if (err) {
                    console.error(err.message);
                }

                res.render('pages/residents', {
                    admin: req.session.admin,
                    residents: residents
                });
            });
        }
    });

    app.post('/buildings/get', function(req, res, next) {
        let query = req.body || {};

        console.log(req.body);

        if (query != {}) {
            for (var key in query) {
                if (!query[key] || query[key] == '') {
                    delete query[key]
                }
            }

            var minArea = parseInt(query.allAreaFrom),
                maxArea = parseInt(query.allAreaTo),
                minLeavingArea = parseInt(query.leavingAreaFrom),
                maxLeavingArea = parseInt(query.leavingAreaTo),
                minSgArea = parseInt(query.sgAreaFrom),
                maxSgArea = parseInt(query.sgAreaTo),
                minBusinessArea = parseInt(query.businessAreaFrom),
                maxBusinessArea = parseInt(query.businessAreaTo),
                minForestArea = parseInt(query.forestAreaFrom),
                maxForestArea = parseInt(query.forestAreaTo),
                LeaversCount = parseInt(query.leavers),
                OwnersCount = parseInt(query.owners);

            query = {
                allArea: {
                    $lte: maxArea, $gte: minArea
                },
                area: {
                    $lte: maxLeavingArea, $gte: minLeavingArea
                },
                sgArea: {
                    $lte: maxSgArea, $gte: minSgArea
                },
                businessArea: {
                    $lte: maxBusinessArea, $gte: minBusinessArea
                },
                forestArea: {
                    $lte: maxForestArea, $gte: minForestArea
                }
            };

            if (req.body.village && req.body.village != '') query.village = req.body.village;
            if (req.body.street && req.body.street != '') query.street = req.body.street;
            if (req.body.number && req.body.number != '') query.number = req.body.number;
        }

        Building.find(query, function(err, buildings) {
            if (err) console.error(err.message);

            console.log('buildings:');
            console.log(buildings);

            res.send({buildings: buildings});
            next();
        });
    });

    app.get('/buildings', function(req, res) {
        if (req.query.add) {
            res.render('pages/new-house', {admin: req.session.admin});
        } else if (req.query.id && mongoose.Types.ObjectId.isValid(req.query.id)) {
            Building.findById(req.query.id, function(err, building) {
                if (err) {
                    console.error(err.message);
                }

                async.waterfall([function(callback) {
                    Resident.find({_id: {$in: building.residents}}, function(err, residents) {
                        if (err) console.error(err.message);

                        Resident.find({_id: {$in: building.owners}}, function(err, owners) {
                            callback(err, {residents: residents, owners: owners});
                        });
                    });
                }], function(err, results) {
                    if (err) {
                        console.error(err.message);
                    }

                    res.render('pages/buildings', {
                        admin: req.session.admin,
                        building: building,
                        residents: results.residents,
                        owners: results.owners
                    });
                });
            });
        } else {
            Building.find({}, function(err, buildings) {
                if (err) {
                    console.error(err.message);
                }

                res.render('pages/residents', {
                    admin: req.session.admin,
                    buildings: buildings
                });
            });
        }
    });

    app.post('/buildings', function(req, res, next) {
        let query = req.body || {};

        if (query != {}) {
            for (var key in query) {
                if (!query[key] || query[key] == '') {
                    delete query[key]
                }
            }

            console.log(query);
        }

        Building.find(query, function(err, buildings) {
            if (err) {
                console.error(err.message);
            }

            res.send({buildings: buildings});
            next();
        });
    });

    app.post('/buildings/getAllSuka', function(req, res, next) {
        Building.find({}, function(err, buildings) {
            if (err) {
                console.error(err.message);
            }

            res.send({buildings: buildings});
            next();
        });
    });

    app.get('/profile', function(req, res) {
        res.render('frontpage', {admin: req.session.admin});
    });

    app.get('/person', function(req, res) {
        res.render('nev_person', {admin: req.session.admin});
    });

    app.get('/logout', function(req, res, next) {
        req.session.admin = false;
        req.logout();
        res.redirect('/login');
    });

    app.post('/addBuilding', function(req, res, next) {
        Building.createBuilding(new Building({
            village: req.body.settlement,
            street: req.body.street,
            number: req.body.number_h,
            area: req.body.area_h,
            sgArea: req.body.area_zm,
            businessArea: req.body.area_b,
            forestArea: req.body.area_l,
            allArea: parseInt(req.body.area_l) + parseInt(req.body.area_b) + parseInt(req.body.area_zm) + parseInt(req.body.area_h)
        }), function(err, building) {
            if (err) {
                console.error(err.message);
            }

            console.log(building);
            res.send({});
            next();
        });
    });

    app.post('/residents/get', function(req, res, next) {
        let query = req.body || {};

        if (query != {}) {
            for (var key in query) {
                if (!query[key] || query[key] == '') {
                    delete query[key]
                }
            }

            console.log(query);
        }

        Resident.find(query, function(err, residents) {
            if (err) console.error(err.message);
            res.send({residents: residents});
            next();
        });
    });

    app.post('/makeDeath', function(req, res, next) {
        console.log(req.body);

        Resident.findByIdAndUpdate(req.body.id, {$set: {dateOfDeath: Date.now()}}, function(err, resident) {
            if (err) console.error(err.message);

            console.log(resident);

            res.send({});
            next();
        });
    });

    app.post('/residents/delete', function(req, res, next) {
        Building.update({_id: req.body.buildingId}, {$pull: {
                residents: req.body['residents[]'] instanceof Array
                    ? {$in: req.body['residents[]']}
                    : req.body['residents[]']
            }
        }, function(err, results) {
            if (err) console.error(err.message);

            res.send({});
            next();
        });
    });

    app.post('/owners/delete', function(req, res, next) {
        console.log(req.body);
        Building.update({_id: req.body.buildingId}, {$pull: {
                owners: req.body['owners[]'] instanceof Array
                    ? {$in: req.body['owners[]']}
                    : req.body['owners[]']
            }
        }, function(err, results) {
            if (err) console.error(err.message);

            res.send({});
            next();
        });
    });

    app.post('/addDocument', upload.any(), function(req, res, next) {
        console.log(req.files[0]);

        if (req.files[0]) {
            var documentName = req.files[0].originalname,
                filename = req.files[0].filename;

            Resident.findByIdAndUpdate(req.body.residentId, {$push: {documents: {
                title: documentName,
                filename: filename
            }}}, function(err) {
                if (err) console.error(err.message);

                res.send({});
                next();
            });
        } else {
            console.log(req.body);
            res.send({});
            next();
        }
    });

    app.post('/residents/add', function(req, res, next) {
        console.log(req.body);
        Building.update({_id: req.body.buildingId}, {$push: {residents: req.body.residentId}}, function(err, building) {
            if (err) console.error(err.message);

            Resident.findByIdAndUpdate(req.body.residentId, {$set: {building: req.body.buildingId}}, { multi: true }, function(err, resident) {
                if (err) console.error(err.message);

                console.log(resident);

                res.send({});
                next();
            });
        });
    });

    app.post('/residents/remove', function(req, res, next) {
        Building.findByIdAndUpdate(req.body.newBuildingId, {$push: {
            residents: req.body['residents[]'] instanceof Array
                ? {$in: req.body['residents[]']}
                : req.body['residents[]']
        }}, function(err) {
            if (err) console.error(err.message);

            Building.update({_id: req.body.buildingId}, {$pull: {
                residents: req.body['residents[]'] instanceof Array
                    ? {$in: req.body['residents[]']}
                    : req.body['residents[]']
            }}, function(err, results) {
                if (err) console.error(err.message);

                Resident.update({_id: req.body['residents[]'] instanceof Array
                    ? {$in: req.body['residents[]']}
                    : req.body['residents[]']
                }, {$set: {building: 'none'}}, function(err, residents) {
                    if (err) console.error(err.message);

                    res.send({});
                    next();
                });
            });
        });
    });

    app.post('/editResident', upload.any(), function(req, res, next) {
        Resident.findByIdAndUpdate(req.body.residentId, {$set: {
            avatar : req.files[0] && req.files[0].filename ? req.files[0].filename : 'avatar.png',
            name: {
                fName: req.body.fName,
                mName: req.body.mName,
                lName: req.body.lName
            },
            conviction: {
                status: req.body.conviction == 'yes' ? true : false,
                description: req.body.conviction == 'yes' ? req.body.convictionInfo : ''
            },
            work: req.body.work,
            study: req.body.study,
            passport: req.body.passport
        }}, function(err, resident) {
            if (err) {
                console.error(err);
            }

            if (!resident) {
                console.log('no resident')
            }

            console.log(resident);
            res.send({});
            next();
        });
    });

    app.post('/addResident', upload.any(), function(req, res, next) {
        Resident.createResident(new Resident({
            avatar : req.files[0] && req.files[0].filename ? req.files[0].filename : 'avatar.png',
            name: {
                fName: req.body.fName,
                mName: req.body.mName,
                lName: req.body.lName
            },
            birth: req.body.birth,
            conviction: {
                status: req.body.conviction == 'yes' ? true : false,
                description: req.body.conviction == 'yes' ? req.body.convictionInfo : ''
            },
            work: req.body.work,
            study: req.body.study,
            //dateOfDeath: req.body.dateOfDeath,
            passport: req.body.passport,
            building: req.body.buildingId
        }), function(err, resident) {
            if (err) {
                console.error(err);
            }

            if (!resident) {
                console.log('no resident')
            }

            Building.findByIdAndUpdate(req.body.buildingId, {$push: {residents: resident._id}}, function(err, building) {
                if (err) console.error(err.message);

                console.log(resident);
                res.send({});
                next();
            });
        });
    });

    app.post('/addOwner', function(req, res, next) {
        Building.findByIdAndUpdate(req.body.buildingId, {$push: {owners: req.body.residentId}}, function(err, building) {
            if (err) console.error(err.message);

            res.send({success: true});
            next();
        });
    });

    app.post('/registrate', function(req, res, next) {
        User.createUser(new User({
            nickname: req.body.username,
            password: req.body.password
        }), function(err, user) {
            if (err) {
                console.error(err.message);
            }

            if (user) {
                console.log(user);
                res.send({user: user});
            }
            next();
        });
    });

    app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/feed' }));

    app.post('/getPost', function(req, res, next) {
        Post.findById(req.body.id, function(err, post) {
            if (err) console.error(err.message);

            res.send(post);
            next();
        });
    });

    app.post('/post', upload.any(), function(req, res, next) {
        var preview = 'default.png',
            title = req.body.title,
            description = req.body.description,
            size = req.body.size,
            images = req.body.images,
            photos = [],
            authors = req.body.authors,
            links = req.body.links,
            tag_name = req.body.tag_name;

        //console.log(req.files);
        //console.log(req.body);

        if (req.files.length > 0) {
            req.files.forEach(function(file) {
                if (file.fieldname == 'preview') {
                    preview = file.filename;
                } else {
                    photos.push(file.filename);
                }
            });
        }

        Post.createPost(new Post({
            text: description,
            title: title,
            sender: req.user._id,
            preview: preview,
            size: size,
            photos: images,
            links: links != '' ? links.split(',') : [],
            authors: authors != '' ? authors.split(',') : [],
            imagesIndexes: images != '' ? images.split(',') : [],
            photos: photos,
            tag_name: tag_name
        }), function(err, post) {
            if (err) console.error(err.message);

            console.log('Post:');
            console.log(post);
            res.send({});
            next();
        });
    });

    app.post('/post/delete', function(req, res, next) {
        Post.deleteOne({_id: req.body.postId}, function(err, result) {
            if (err) console.error(err.message);

            res.send({});
            next();
        });
    });






    app.get("/b_new_torgoviy", function(req,res){
        res.render('pages/b_new_torgoviy', {admin: req.session.admin}) 
    });

    app.get("/b_marcet", function(req,res){
        Marcet.find({}, function(err, Marcet) {
            if (err) {
                console.error(err.message);
            }
            
            res.render('pages/b_marcet', {admin: req.session.admin, Marcets: Marcet});
            
        });
    });


    app.get("/b_personal", function(req,res){
        Torgoviy.find({}, function(err, Torgoviy) {
            if (err) {
                console.error(err.message);
            }
            res.render('pages/b_personal', {admin: req.session.admin, Personal: Torgoviy});
            
        });
    });

    
    app.get("/b_new_permarcet", function(req,res){
        res.render('pages/b_new_permarcet', {admin: req.session.admin}) 
    });


    app.get("/b_pryxid", function(req,res){
        res.render('pages/b_tovari', {admin: req.session.admin}) 
    });


    app.get("/b_tovari", function(req,res){
        res.render('pages/b_tovari', {admin: req.session.admin}) 
    });

    app.get("/b_sklad", function(req,res){
        Tovar.find({}, function(err, Tovar) {
            if (err) {
                console.error(err.message);
            }
            
            res.render('pages/b_sklad', {admin: req.session.admin, Tovari: Tovar});
            
        });

    });

    app.get("/b_zamovlenia",async function(req,res){
        const Marcets = await Marcet.find({});
        const Tovari = await Tovar.find({});
        const Personal = await Torgoviy.find({});
        
        res.render('pages/b_zamovlenia', {
          admin: req.session.admin, 
          Marcets: Marcets, 
          Tovari: Tovari, 
          Personal: Personal
        });

    });


 app.get("/b_spisokzamovlen",async function(req,res){
      //  const Marcets = await Marcet.find({});
      //  const zamovlenia = await Zamovlenia.find({})
      //  .sort({ $natural: -1 })
      //  .limit(50);
      //  const Personal = await Torgoviy.find({})
    const zminazam = await Zamovlenia.find({})
    const torgov = await Torgoviy.find({ _id: { $in: zminazam.map(el => el.torgo) } });
    const tochkaz = await Marcet.find({ _id: { $in: zminazam.map(el => el.tochka) } });

    zminazam.forEach(zam => {
      zam.torgo = torgov[torgov.findIndex(t => t._id == zam.torgo)];
    });

    zminazam.forEach(zam => {
      zam.tochka = tochkaz[tochkaz.findIndex(t => t._id == zam.tochka)];
    });

  //  console.log (zminazam);

    res.render('pages/b_spisokzamovlen', {
     admin: req.session.admin,
     orders: zminazam, 
    });

    });








app.get('/orderfarm', async (req, res) => {
      var current_page = req.query.page || 1;

     

    const zminazam = await Zamovlenia.findById(req.query.id);
    const torgov = await Torgoviy.findById(zminazam.torgo);
    const products = await Tovar.find({ _id: {$in: zminazam.masivtov.map(e => e.tovaID)} });  
    const tochkaz = await Marcet.findById(zminazam.tochka);
    
    const secret = {
        number: zminazam.number,
        tochka: tochkaz,
        masivtov: products.map((e,index)=>{return Object.assign({kilka: zminazam.masivtov[index].count},e._doc)}),
        torgo: torgov
      };
    //console.log(products.map((e,index)=>{return Object.assign({kilka: zminazam.masivtov[index].count},e._doc)}));

    //console.log(products.map((e, index) => Object.assign({}, {text: "sometext"}, {message: "somemessage"}, e)));
       res.render('pages/a_infa', {
           admin: req.session.admin,
           Infozam: secret,
 
           postsPagesCount: 0

       });
    });









}