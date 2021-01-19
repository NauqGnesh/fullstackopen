describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  it('login form shows', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#Username').type('root')
      cy.get('#Password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#Username').type('root')
      cy.get('#Password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  const blogs = [
    {
      author: 'Sum Ting Wong',
      title: 'Na Ting Wong',
      url: 'www.everythingiswrong.com',
      likes: 2,
    },
    {
      author: 'Mark Manson',
      title: 'Mark Manson Blog',
      url: 'https://markmanson.net',
      likes: 5,
    },
    {
      author: 'Cal Newport',
      title: 'Cal Newport Blog',
      url: 'https://calnewport.net',
      likes: 9,
    },
  ]

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#author').type('Chairman Mao')
      cy.get('#title').type('China Number 1')
      cy.get('#url').type('www.youtube/blackdudecommunists.com')
      cy.get('#addblog-btn').click()
    })

    describe('a few notes exists', function () {
      beforeEach(function () {
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('one of the blogs can be liked', function () {
        cy.contains('Cal Newport Blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('like').click()
      })

      it('created blogs can be delete', function () {
        cy.contains('Cal Newport Blog').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('delete').click()
      })

      it.only('blogs are ordered descending', function () {
        cy.get('#blog-list')
          .children()
          .first()
          .should('contain.text', blogs[2].title)

        cy.get('#blog-list')
          .children()
          .last()
          .should('contain.text', blogs[0].title)
      })
    })
  })
})
