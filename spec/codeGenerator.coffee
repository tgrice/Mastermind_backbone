describe 'CodeGenerator', ->

  it 'returns a code of length 4', ->
    gen = new CodeGenerator
    code = gen.createCode()
    expect(code.length).toBe 4

  it 'validates digits in code', ->
    gen = new CodeGenerator
    code = gen.createCode()
    count = 0
    for value in code
      if value <10 then count++
    expect(count).toBe code.length
