describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST','http://localhost:3003/api/users/',user)
    const user1 = {
      name: 'Gulam Moyuddin',
      username: 'moyuddin',
      password: 'gulam123'
    }
    cy.request('POST','http://localhost:3003/api/users/',user1)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })
  describe('Login',function () {
    it('succeeds with correct credentiatls',function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with wrong credentials',function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('easy')
      cy.contains('login').click()
      cy.get('.Error').should('contain','Invalid credentials')
      cy.get('.Error').should('have.css','color','rgb(255, 0, 0)')
      cy.get('.Error').should('have.css','border-style','solid')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai',password:'salainen' })
      //cy.makeblog({ title:'we can test it by cypress' ,author:'moyuddin',url:'go.com' })
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('this is integrated testing')
      cy.get('#author').type('moyuddin')
      cy.get('#url').type('go.com')
      cy.get('#createbutton').click()

      cy.contains('this is integrated testing moyuddin')
    })
  })
  describe('After making blog',function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai',password:'salainen' })
      cy.makeblog({ title:'this is integrated testing',author:'moyuddin',url:'go.com' })
    })
    it('Likes can be increased',function() {
    //  cy.makeblog({ title:'this is integrated testing',author:'moyuddin',url:'go.com' })

      cy.contains('this is integrated testing moyuddin').contains('view').click()

      cy.contains('like').click()
      cy.contains('1')
    })
    it('blog can be deleted',function() {
    //  cy.makeblog({ title:'this is integrated testing',author:'moyuddin',url:'go.com' })
      cy.contains('this is integrated testing moyuddin').contains('view').click()
      cy.contains('remove')
    })
    it('unauthorized user cannot delete blog',function() {
    //    cy.makeblog({ title:'this is integrated testing',author:'moyuddin',url:'go.com' })
      cy.contains('log out').click()
      cy.login({ username:'moyuddin',password:'gulam123' })
      cy.contains('this is integrated testing moyuddin').contains('view').click()
      cy.should('not.contain','remove')
    })
    it('blogs are displayed in according to likes',{ defaultCommandTimeout: 10000 },function(){
      cy.makeblog({ title:'we can test it by cypress',author:'gm',url:'go.com' })
      cy.contains('we can test it by cypress').contains('view').click()
      cy.contains('we can test it by cypress').parent().contains('like').click().wait(1000)
      //cy.contains('we can test it by cypress').contains('hide').click()
      cy.contains('this is integrated testing moyuddin').contains('view').click()
      cy.contains('this is integrated testing moyuddin').parent().contains('like').click().wait(1000)
      cy.contains('this is integrated testing moyuddin').parent().contains('like').click().wait(1000)

      //cy.wait(50)
      cy.get('.blog').eq(0).contains('this is integrated testing moyuddin')
    })
  })
})