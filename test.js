const consData = require('./data/consonantData');
const db = require('../data.dbConfig');

describe('consonants', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });

  it('can create a new consonant', async () => {
    const [id] = await consData.createCons({ place: 'nasal', manner: 'fricative' });

    const consonant = await db('consonants')
      .where({ id })
      .first();

    expect(consonant).toEqual({
      place: 'nasal',
      manner: 'fricative',
      voiced: false,
      length: 'normal'
    });
  });

  it('can destroy an old consonant', async () => {
    consData.createCons({ place: 'glottal', manner: 'lateral', voiced: true });

    full = consData.all();

    expect(full.length).toBe(1);

    consData.destroyCons(full[0].id);

    emptied = consData.all();

    expect(emptied.length).toBe(0);
  });
});
