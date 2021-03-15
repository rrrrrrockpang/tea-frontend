from numpy import array
from statsmodels.stats.power import tt_ind_solve_power, FTestAnovaPower


def get_powers(data):
    sample_size = array(range(data['sample_size'][0], data['sample_size'][1]))
    effect_sizes = array(data['effect_size'])
    test = data['test']

    powers = dict()
    if test != 't-test':
        F = FTestAnovaPower()
    for effect_size in effect_sizes:
        powers[effect_size] = dict()
        temp = []
        for size in sample_size: # in one group
            if test == 't-test':
                p = tt_ind_solve_power(effect_size=effect_size, nobs1=size, alpha=0.05, ratio=1, alternative='two-sided')
            else:
                p = F.solve_power(effect_size=effect_size, nobs=size, alpha=0.05)
            temp.append(p)
        powers[effect_size]["powers"] = temp

    return powers
