import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './GblocSwitcher.module.scss';

import ButtonDropdown from 'components/ButtonDropdown/ButtonDropdown';
import { useListGBLOCsQueries } from 'hooks/queries';
import SelectedGblocContext, {
  SELECTED_GBLOC_SESSION_STORAGE_KEY,
} from 'components/Office/GblocSwitcher/SelectedGblocContext';

const GBLOCSwitcher = ({ officeUsersDefaultGbloc, ariaLabel }) => {
  const [isInitialPageLoad, setIsInitialPageLoad] = useState(true);
  const { selectedGbloc, handleGblocChange } = useContext(SelectedGblocContext);

  const { result: gblocs } = useListGBLOCsQueries();
  if (gblocs.indexOf(officeUsersDefaultGbloc) === -1) {
    gblocs.push(officeUsersDefaultGbloc);
  }

  useEffect(() => {
    if (window.sessionStorage.getItem(SELECTED_GBLOC_SESSION_STORAGE_KEY) && isInitialPageLoad) {
      handleGblocChange(window.sessionStorage.getItem(SELECTED_GBLOC_SESSION_STORAGE_KEY));
      setIsInitialPageLoad(false);
    } else if (isInitialPageLoad) {
      handleGblocChange(officeUsersDefaultGbloc);
      setIsInitialPageLoad(false);
    }
  }, [selectedGbloc, officeUsersDefaultGbloc, isInitialPageLoad, handleGblocChange]);

  return (
    <ButtonDropdown
      onChange={(e) => {
        handleGblocChange(e.target.value);
      }}
      value={selectedGbloc || officeUsersDefaultGbloc}
      ariaLabel={ariaLabel}
      divClassName={styles.switchGblocButton}
      testId="gbloc_switcher"
    >
      {gblocs.map((gbloc) => (
        <option value={gbloc} key={`filterOption_${gbloc}`}>
          {gbloc}
        </option>
      ))}
    </ButtonDropdown>
  );
};

GBLOCSwitcher.defaultProps = {
  ariaLabel: '',
};

GBLOCSwitcher.propTypes = {
  officeUsersDefaultGbloc: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
};

export default GBLOCSwitcher;
