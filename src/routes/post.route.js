const express = require ("express");
const postUseCase = require ("../usecases/post.usecase");
const auth = require("../middleware/auth.middleware");
const jwt = require("../lib/jwt");
const route = express.Router();

// GET publicaciones 
route.get("/", async (req,res) => {
    try {
        const search = req.query.search;
        
        if(!search) {
            const post = await postUseCase.getAll();

            res.json ({
                succes: true,
                meessage: "All Post",
                data: { post },
            })
        } else {
            const tittle = await postUseCase.getByTittle(search);
            res.json({
                succes: true,
                message: "All post finded with " + search,
                data: { tittle },
            });
        }
    } catch (error) {
        res.status(error.status || 500);
        res.json ({
            succes: false, 
            error: error.message,
        });
    }
});

// POST PARA CREAR Publicaciones
route.post("/", auth, async (req,res) => {
    try {
        req.body.user = req.user.id;
        const postCreate = await postUseCase.create(req.body); 

        res.json({
            succes: true,
            message: "YEI you created a post!!! ",
            data : {
                post: postCreate
            }
        })
    } catch (error) {
        res.status(error.status || 500);
        res.json({
          succes: false,
          error: error.message,
        });
    }
});

//PATCH para actualizar publicaciones
route.patch("/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const postUpdate = await postUseCase.updateById(id, req.body);
      res.json({
        succes: true,
        message: "Your post has been updated",
        data: { postCreate: postUpdate },
      });
    } catch (error) {
      res.status(error.status || 500);
      res.json({
        succes: false,
        error: error.message,
      });
    }
  });

  //DELETE para poder borrar publicaciones 
route.delete ("/:id", auth, async (req,res) =>  {
    try {
        const payload = jwt.verify(req.headers.authorization);
        const idUserActive = await payload.id;
        const { id } = req.params;
        const post = await postUseCase.getById(id);
        const idUserPost = post.user;

        const postDelete = await postUseCase.deleteById ( id,idUserPost,idUserActive);

        res.json ({
            succes: true,
            message: "Your post has been deleted :(",
            data: {
                post: postDelete
            }
        });

    } catch (error) {
        res.status(error.status || 500);
        res.json({
          succes: false,
          error: error.message,
        });es
    }
})

module.exports = route;
